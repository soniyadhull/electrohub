import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const formatPrice = (price) => new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
}).format(price);

export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const [trackingId, setTrackingId] = useState(searchParams.get("id") || "");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const track = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setOrder(null);
    try {
      const response = await fetch(`/api/orders/${encodeURIComponent(trackingId.trim())}`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Order could not be found.");
      setOrder(result.order);
    } catch (trackError) {
      setError(trackError.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Order updates</span>
          <h1>Track your <span className="grad">order</span></h1>
          <p>Checkout par mila tracking ID enter karein.</p>
        </div>
      </section>
      <section className="section tracking-section">
        <div className="container tracking-layout">
          <form className="form tracking-form" onSubmit={track}>
            <label>
              Order tracking ID
              <input value={trackingId} onChange={(event) => setTrackingId(event.target.value)} placeholder="Paste your tracking ID" required />
            </label>
            <button className="btn btn-amber" type="submit" disabled={busy}>{busy ? "Checking…" : "Track order"}</button>
            {error && <p className="status err" role="alert">{error}</p>}
          </form>
          {order && (
            <article className="tracking-result">
              <div className="tracking-result-head">
                <div><span className="eyebrow">Current status</span><h2>{order.statusLabel}</h2></div>
                <span className={`tracking-payment ${order.paymentStatus === "paid" ? "is-paid" : ""}`}>
                  {order.paymentStatus === "paid" ? "Paid" : order.paymentMethod === "cod" ? "Cash on delivery" : "Payment pending"}
                </span>
              </div>
              <p className="tracking-code">{order.trackingId}</p>
              <p>Estimated delivery: <strong>{order.deliveryEstimate}</strong></p>
              <div className="tracking-items">
                {order.items.map((item) => <p key={item.productId}>{item.name} × {item.quantity}</p>)}
              </div>
              <div className="summary-line"><span>Delivery</span><strong>{order.deliveryCharge === 0 ? "Free" : formatPrice(order.deliveryCharge)}</strong></div>
              <div className="summary-line"><span>Total</span><strong>{formatPrice(order.total)}</strong></div>
              <ol className="tracking-timeline">
                {order.updates.map((update, index) => (
                  <li key={`${update.at}-${index}`} className={index === order.updates.length - 1 ? "current" : ""}>
                    <strong>{update.label}</strong>
                    <time dateTime={update.at}>{new Date(update.at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</time>
                  </li>
                ))}
              </ol>
              <Link to="/contact">Need help? Contact the shop</Link>
            </article>
          )}
        </div>
      </section>
    </>
  );
}
