import { useState } from "react";
import { API } from "../api.js";

const STATUSES = [
  ["confirmed", "Confirmed"],
  ["processing", "Preparing order"],
  ["shipped", "Shipped"],
  ["out_for_delivery", "Out for delivery"],
  ["delivered", "Delivered"],
  ["cancelled", "Cancelled"],
];

export default function OrderAdmin() {
  const [key, setKey] = useState("");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const request = async (url, options = {}) => {
    const response = await fetch(`${API}${url}`, {
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${key}` },
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Order admin request failed.");
    return result;
  };

  const loadOrders = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result = await request("/api/admin/orders");
      setOrders(result.orders);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setBusy(false);
    }
  };

  const updateStatus = async (trackingId, status) => {
    setError("");
    try {
      await request(`/api/admin/orders/${encodeURIComponent(trackingId)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const result = await request("/api/admin/orders");
      setOrders(result.orders);
    } catch (updateError) {
      setError(updateError.message);
    }
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Shop tools</span>
          <h1>Order <span className="grad">management</span></h1>
          <p>Protected page for ElectroHub staff.</p>
        </div>
      </section>
      <section className="section admin-section">
        <div className="container admin-layout">
          <form className="form admin-login" onSubmit={loadOrders}>
            <label>
              Server admin key
              <input type="password" autoComplete="current-password" value={key} onChange={(event) => setKey(event.target.value)} required />
            </label>
            <button className="btn btn-amber" type="submit" disabled={busy}>{busy ? "Loading…" : "Load orders"}</button>
            <p className="admin-note">Key is kept only in this page session and is never stored in the browser.</p>
          </form>
          {error && <p className="status err" role="alert">{error}</p>}
          {orders.map((order) => (
            <article className="admin-order" key={order.trackingId}>
              <div className="admin-order-heading">
                <div><strong>{order.name}</strong><span>{order.phone} · {order.city}, Haryana</span></div>
                <span className="tracking-payment">{order.statusLabel}</span>
              </div>
              <p className="tracking-code">{order.trackingId}</p>
              <p>{order.address} · {order.pincode}</p>
              <ul>{order.items.map((item) => <li key={item.productId}>{item.name} × {item.quantity}</li>)}</ul>
              <p>Total: <strong>₹{order.total.toLocaleString("en-IN")}</strong> · {order.paymentMethod === "cod" ? "COD" : `Online (${order.paymentStatus})`}</p>
              <label className="admin-status-label">
                Update status
                <select value={order.status} onChange={(event) => updateStatus(order.trackingId, event.target.value)}>
                  <option value="placed">Order placed</option>
                  <option value="awaiting_payment" disabled>Payment pending</option>
                  {order.paymentMethod === "razorpay" && order.paymentStatus !== "paid"
                    ? <option value="cancelled">Cancelled</option>
                    : STATUSES.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
