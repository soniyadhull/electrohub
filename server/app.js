import express from "express";
import cors from "cors";
import fs from "node:fs/promises";
import path from "node:path";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { fileURLToPath } from "node:url";
import { PRODUCTS } from "../client/src/data.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ORDER_STATES = new Set(["placed", "confirmed", "processing", "shipped", "out_for_delivery", "delivered", "cancelled"]);
const ORDER_LABELS = {
  placed: "Order placed",
  confirmed: "Confirmed",
  processing: "Preparing order",
  shipped: "Shipped",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
  awaiting_payment: "Payment pending",
};

const clean = (value) => (typeof value === "string" ? value.trim() : "");
const publicOrder = (order) => ({
  trackingId: order.trackingId,
  status: order.status,
  statusLabel: ORDER_LABELS[order.status] || "Order update",
  paymentMethod: order.paymentMethod,
  paymentStatus: order.paymentStatus,
  items: order.items.map(({ productId, name, quantity, unitPrice }) => ({ productId, name, quantity, unitPrice })),
  subtotal: order.subtotal,
  deliveryCharge: order.deliveryCharge,
  total: order.total,
  deliveryEstimate: order.deliveryEstimate,
  createdAt: order.createdAt,
  updates: order.updates.map(({ status, at }) => ({ status, label: ORDER_LABELS[status] || "Order update", at })),
});

export function createApp({
  orderFile = path.join(__dirname, "orders.json"),
  env = process.env,
  fetchImpl = globalThis.fetch,
} = {}) {
  let writeQueue = Promise.resolve();
  const app = express();
  app.use(cors({ origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : true }));
  app.use(express.json({ limit: "32kb" }));

  const readOrders = async () => {
    try {
      return JSON.parse(await fs.readFile(orderFile, "utf8"));
    } catch (error) {
      if (error.code === "ENOENT") return [];
      throw error;
    }
  };

  const mutateOrders = (mutator) => {
    const operation = writeQueue.then(async () => {
      const orders = await readOrders();
      const result = await mutator(orders);
      const temporaryFile = `${orderFile}.${process.pid}.tmp`;
      await fs.writeFile(temporaryFile, JSON.stringify(orders, null, 2), { mode: 0o600 });
      await fs.rename(temporaryFile, orderFile);
      return result;
    });
    writeQueue = operation.catch(() => {});
    return operation;
  };

  const requireAdmin = (req, res, next) => {
    const configuredKey = clean(env.ORDER_ADMIN_KEY);
    if (!configuredKey) return res.status(503).json({ error: "Order admin is not configured on the server." });
    const suppliedKey = clean(req.get("authorization")).replace(/^Bearer\s+/i, "");
    const expected = Buffer.from(configuredKey);
    const supplied = Buffer.from(suppliedKey);
    if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) {
      return res.status(401).json({ error: "Admin key is invalid." });
    }
    next();
  };

  const razorpayConfigured = Boolean(env.RAZORPAY_KEY_ID && env.RAZORPAY_KEY_SECRET);

  app.get("/api/info", (_req, res) => {
    res.json({
      name: "ElectroHub",
      address: "Chamela Colony, Narwana, Jind, Haryana",
      phone: "8053242544",
    });
  });

  app.get("/api/store-config", (_req, res) => {
    res.json({
      deliveryArea: "Haryana",
      deliveryCharge: 0,
      deliveryEstimate: "3–7 business days",
      paymentMethods: { cashOnDelivery: true, razorpay: razorpayConfigured },
    });
  });

  app.post("/api/contact", async (req, res, next) => {
    const { name, phone, message } = req.body || {};
    if (!clean(name) || !/^[6-9]\d{9}$/.test(clean(phone)) || !clean(message)) {
      return res.status(400).json({ ok: false, error: "Naam, sahi 10-digit phone aur message zaroori hai." });
    }
    try {
      const file = path.join(__dirname, "messages.json");
      let all = [];
      try {
        all = JSON.parse(await fs.readFile(file, "utf8"));
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
      }
      all.push({ name: clean(name), phone: clean(phone), message: clean(message), at: new Date().toISOString() });
      await fs.writeFile(file, JSON.stringify(all, null, 2), { mode: 0o600 });
      res.json({ ok: true });
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/orders", async (req, res, next) => {
    const body = req.body || {};
    const name = clean(body.name);
    const phone = clean(body.phone);
    const address = clean(body.address);
    const city = clean(body.city);
    const pincode = clean(body.pincode);
    const paymentMethod = clean(body.paymentMethod);
    const inputItems = Array.isArray(body.items) ? body.items : [];
    if (!name || name.length > 100 || !/^[6-9]\d{9}$/.test(phone) || !address || address.length > 300 ||
        !city || city.length > 100 || !/^(12|13)\d{4}$/.test(pincode) ||
        clean(body.state).toLowerCase() !== "haryana" ||
        !["cod", "razorpay"].includes(paymentMethod) || inputItems.length < 1 || inputItems.length > 20) {
      return res.status(400).json({ error: "Valid name, mobile, Haryana address, PIN code, payment method and products are required." });
    }
    if (paymentMethod === "razorpay" && !razorpayConfigured) {
      return res.status(503).json({ error: "Online payment is not set up yet. Please choose cash on delivery." });
    }

    const items = [];
    for (const input of inputItems) {
      const product = PRODUCTS.find((item) => item.id === clean(input?.productId));
      const quantity = Number(input?.quantity);
      if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 5) {
        return res.status(400).json({ error: "Order contains an invalid product or quantity." });
      }
      items.push({ productId: product.id, name: product.name, quantity, unitPrice: product.price });
    }
    const subtotal = items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
    const order = {
      trackingId: randomUUID(),
      name,
      phone,
      address,
      city,
      pincode,
      items,
      subtotal,
      deliveryCharge: 0,
      total: subtotal,
      deliveryEstimate: "3–7 business days",
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "pay_on_delivery" : "pending",
      status: paymentMethod === "cod" ? "placed" : "awaiting_payment",
      createdAt: new Date().toISOString(),
      updates: [{ status: paymentMethod === "cod" ? "placed" : "awaiting_payment", at: new Date().toISOString() }],
    };

    try {
      if (paymentMethod === "razorpay") {
        let response;
        try {
          response = await fetchImpl("https://api.razorpay.com/v1/orders", {
            method: "POST",
            headers: {
              Authorization: `Basic ${Buffer.from(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`).toString("base64")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: order.total * 100, currency: "INR", receipt: order.trackingId }),
          });
        } catch (error) {
          console.error("Razorpay order creation failed:", error.message);
          return res.status(502).json({ error: "Payment service could not be reached. Please try again or choose cash on delivery." });
        }
        const gatewayOrder = await response.json();
        if (!response.ok || !gatewayOrder.id) {
          console.error("Razorpay rejected order creation:", gatewayOrder.error?.description || response.status);
          return res.status(502).json({ error: "Could not start online payment. Please try again or choose cash on delivery." });
        }
        order.gatewayOrderId = gatewayOrder.id;
        await mutateOrders((orders) => orders.push(order));
        return res.status(201).json({
          order: publicOrder(order),
          razorpay: { key: env.RAZORPAY_KEY_ID, orderId: gatewayOrder.id, amount: gatewayOrder.amount, currency: gatewayOrder.currency },
        });
      }
      await mutateOrders((orders) => orders.push(order));
      res.status(201).json({ order: publicOrder(order) });
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/orders/:trackingId/verify-payment", async (req, res, next) => {
    const { razorpay_order_id: gatewayOrderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = req.body || {};
    if (!gatewayOrderId || !paymentId || !signature) {
      return res.status(400).json({ error: "Razorpay payment verification details are incomplete." });
    }
    try {
      let result;
      await mutateOrders((orders) => {
        const order = orders.find((item) => item.trackingId === req.params.trackingId);
        if (!order || order.paymentMethod !== "razorpay" || order.gatewayOrderId !== gatewayOrderId) {
          result = { status: 404, error: "Payment order was not found." };
          return;
        }
        const expected = createHmac("sha256", env.RAZORPAY_KEY_SECRET)
          .update(`${order.gatewayOrderId}|${paymentId}`)
          .digest("hex");
        const expectedBuffer = Buffer.from(expected);
        const signatureBuffer = Buffer.from(signature);
        if (expectedBuffer.length !== signatureBuffer.length || !timingSafeEqual(expectedBuffer, signatureBuffer)) {
          result = { status: 400, error: "Payment signature could not be verified." };
          return;
        }
        if (order.paymentStatus === "paid" && order.paymentId === paymentId) {
          result = { status: 200, order: publicOrder(order) };
          return;
        }
        if (order.paymentStatus !== "pending" || order.status !== "awaiting_payment") {
          result = { status: 409, error: "This order is not awaiting payment." };
          return;
        }
        order.paymentStatus = "paid";
        order.paymentId = paymentId;
        order.status = "placed";
        order.updates.push({ status: "placed", at: new Date().toISOString() });
        result = { status: 200, order: publicOrder(order) };
      });
      if (result.error) return res.status(result.status).json({ error: result.error });
      res.json({ order: result.order });
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/orders/:trackingId", async (req, res, next) => {
    try {
      const orders = await readOrders();
      const order = orders.find((item) => item.trackingId === req.params.trackingId);
      if (!order) return res.status(404).json({ error: "Order tracking ID not found." });
      res.json({ order: publicOrder(order) });
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/admin/orders", requireAdmin, async (_req, res, next) => {
    try {
      const orders = await readOrders();
      res.json({ orders: orders.map((order) => ({ ...order, statusLabel: ORDER_LABELS[order.status] || "Order update" })) });
    } catch (error) {
      next(error);
    }
  });

  app.patch("/api/admin/orders/:trackingId", requireAdmin, async (req, res, next) => {
    const status = clean(req.body?.status);
    if (!ORDER_STATES.has(status)) return res.status(400).json({ error: "Choose a valid order status." });
    try {
      let updated;
      await mutateOrders((orders) => {
        const order = orders.find((item) => item.trackingId === req.params.trackingId);
        if (order) {
          if (order.paymentMethod === "razorpay" && order.paymentStatus !== "paid" && status !== "cancelled") {
            updated = { error: "Online payment must be verified before an order can be fulfilled.", status: 409 };
            return;
          }
          order.status = status;
          order.updates.push({ status, at: new Date().toISOString() });
          updated = { trackingId: order.trackingId, status, statusLabel: ORDER_LABELS[status] };
        }
      });
      if (!updated) return res.status(404).json({ error: "Order was not found." });
      if (updated.error) return res.status(updated.status).json({ error: updated.error });
      res.json({ order: updated });
    } catch (error) {
      next(error);
    }
  });

  const dist = path.join(__dirname, "../client/dist");
  app.use(express.static(dist));
  app.get("*", (_req, res, next) => {
    fs.access(path.join(dist, "index.html")).then(
      () => res.sendFile(path.join(dist, "index.html")),
      next,
    );
  });

  app.use((error, _req, res, _next) => {
    console.error("Request failed:", error.message);
    res.status(500).json({ error: "Server error. Please try again." });
  });

  return app;
}
