import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { once } from "node:events";
import test from "node:test";
import { createApp } from "./app.js";

const orderDetails = {
  name: "Test Customer",
  phone: "9876543210",
  address: "12 Test Road",
  city: "Narwana",
  state: "Haryana",
  pincode: "126116",
  items: [{ productId: "samsung-galaxy-s26-fe", quantity: 1 }],
};

async function startApp(options = {}) {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "electrohub-test-"));
  const server = createApp({
    orderFile: path.join(directory, "orders.json"),
    ...options,
  }).listen(0);
  await once(server, "listening");
  return {
    baseUrl: `http://127.0.0.1:${server.address().port}`,
    close: async () => {
      await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
      await fs.rm(directory, { recursive: true, force: true });
    },
  };
}

async function jsonRequest(baseUrl, route, options) {
  const response = await fetch(`${baseUrl}${route}`, options);
  return { response, body: await response.json() };
}

test("COD checkout returns safe tracking details and admin status updates", async () => {
  const app = await startApp({ env: { ORDER_ADMIN_KEY: "test-admin-key" } });
  try {
    const { response, body } = await jsonRequest(app.baseUrl, "/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...orderDetails, paymentMethod: "cod" }),
    });
    assert.equal(response.status, 201);
    assert.equal(body.order.total, 79999);
    assert.equal(body.order.deliveryCharge, 0);
    assert.equal(body.order.deliveryEstimate, "3–7 business days");

    const tracked = await jsonRequest(app.baseUrl, `/api/orders/${body.order.trackingId}`);
    assert.equal(tracked.response.status, 200);
    assert.equal("phone" in tracked.body.order, false);
    assert.equal("address" in tracked.body.order, false);
    assert.equal("name" in tracked.body.order, false);

    const unauthorized = await jsonRequest(app.baseUrl, "/api/admin/orders");
    assert.equal(unauthorized.response.status, 401);
    const updated = await jsonRequest(app.baseUrl, `/api/admin/orders/${body.order.trackingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: "Bearer test-admin-key" },
      body: JSON.stringify({ status: "confirmed" }),
    });
    assert.equal(updated.response.status, 200);
    assert.equal(updated.body.order.status, "confirmed");
  } finally {
    await app.close();
  }
});

test("checkout rejects addresses outside configured Haryana state", async () => {
  const app = await startApp();
  try {
    const { response } = await jsonRequest(app.baseUrl, "/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...orderDetails, state: "Punjab", paymentMethod: "cod" }),
    });
    assert.equal(response.status, 400);
  } finally {
    await app.close();
  }
});

test("Razorpay orders require verified payment before fulfillment", async () => {
  const secret = "test-razorpay-secret";
  const app = await startApp({
    env: { ORDER_ADMIN_KEY: "test-admin-key", RAZORPAY_KEY_ID: "test-key-id", RAZORPAY_KEY_SECRET: secret },
    fetchImpl: async () => ({
      ok: true,
      json: async () => ({ id: "order_gateway_test", amount: 7999900, currency: "INR" }),
    }),
  });
  try {
    const created = await jsonRequest(app.baseUrl, "/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...orderDetails, paymentMethod: "razorpay" }),
    });
    assert.equal(created.response.status, 201);
    assert.equal(created.body.razorpay.orderId, "order_gateway_test");

    const updateBeforePayment = await jsonRequest(app.baseUrl, `/api/admin/orders/${created.body.order.trackingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: "Bearer test-admin-key" },
      body: JSON.stringify({ status: "processing" }),
    });
    assert.equal(updateBeforePayment.response.status, 409);

    const paymentId = "pay_gateway_test";
    const signature = createHmac("sha256", secret)
      .update(`order_gateway_test|${paymentId}`)
      .digest("hex");
    const verified = await jsonRequest(app.baseUrl, `/api/orders/${created.body.order.trackingId}/verify-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        razorpay_order_id: "order_gateway_test",
        razorpay_payment_id: paymentId,
        razorpay_signature: signature,
      }),
    });
    assert.equal(verified.response.status, 200);
    assert.equal(verified.body.order.paymentStatus, "paid");
  } finally {
    await app.close();
  }
});
