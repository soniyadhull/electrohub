import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PRODUCTS } from "../data.js";
import { API } from "../api.js";

const EMPTY_CONFIG = {
  deliveryArea: "Haryana",
  deliveryCharge: 0,
  deliveryEstimate: "3–7 business days",
  paymentMethods: { cashOnDelivery: true, razorpay: false },
};

const formatPrice = (price) => new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
}).format(price);

function loadRazorpay() {
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(Boolean(window.Razorpay));
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function Checkout() {
  const location = useLocation();
  const [items, setItems] = useState(() => {
    const requested = location.state?.items;
    return Array.isArray(requested)
      ? requested.filter((item) => PRODUCTS.some((product) => product.id === item.productId))
        .map((item) => ({ productId: item.productId, quantity: Math.max(1, Math.min(5, Number(item.quantity) || 1)) }))
      : [];
  });
  const [config, setConfig] = useState(EMPTY_CONFIG);
  const [configError, setConfigError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", pincode: "" });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);
  const [paymentSession, setPaymentSession] = useState(null);
  const [paymentProof, setPaymentProof] = useState(null);

  useEffect(() => {
    let active = true;
    fetch(`${API}/api/store-config`)
      .then(async (response) => {
        if (!response.ok) throw new Error("Delivery and payment settings could not be loaded.");
        return response.json();
      })
      .then((storeConfig) => {
        if (active) {
          setConfig(storeConfig);
          setPaymentMethod(storeConfig.paymentMethods?.cashOnDelivery ? "cod" : "razorpay");
        }
      })
      .catch((fetchError) => {
        if (active) setConfigError(fetchError.message);
      });
    return () => {
      active = false;
    };
  }, []);

  const cart = useMemo(() => items.map((item) => {
    const product = PRODUCTS.find((entry) => entry.id === item.productId);
    return product ? { ...product, quantity: item.quantity } : null;
  }).filter(Boolean), [items]);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal + config.deliveryCharge;

  const changeQuantity = (productId, delta) => {
    setItems((current) => current.map((item) => item.productId === productId
      ? { ...item, quantity: Math.max(1, Math.min(5, item.quantity + delta)) }
      : item));
  };

  const setField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const verifyPayment = async (trackingId, payment) => {
    setBusy(true);
    setError("");
    try {
      const verification = await fetch(`${API}/api/orders/${trackingId}/verify-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payment),
      });
      const verified = await verification.json();
      if (!verification.ok) throw new Error(verified.error || "Payment verification failed.");
      setPlacedOrder(verified.order);
      setPaymentProof(null);
    } catch (verificationError) {
      setPaymentProof(payment);
      setError(`${verificationError.message} Tracking ID: ${trackingId}. Keep your payment ID and contact the shop.`);
    } finally {
      setBusy(false);
    }
  };

  const submitOrder = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (paymentProof && paymentSession) {
        await verifyPayment(paymentSession.order.trackingId, paymentProof);
        return;
      }

      let result = paymentSession;
      if (!result) {
        const response = await fetch(`${API}/api/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            state: "Haryana",
            items: cart.map(({ id, quantity }) => ({ productId: id, quantity })),
            paymentMethod,
          }),
        });
        result = await response.json();
        if (!response.ok) throw new Error(result.error || "Order could not be placed.");
      }

      if (result.order.paymentMethod === "cod") {
        setPlacedOrder(result.order);
        return;
      }

      setPaymentSession(result);
      const loaded = await loadRazorpay();
      if (!loaded) {
        throw new Error(`Razorpay checkout could not load. Tracking ID: ${result.order.trackingId}. Retry here or contact the shop.`);
      }
      const checkout = new window.Razorpay({
        key: result.razorpay.key,
        amount: result.razorpay.amount,
        currency: result.razorpay.currency,
        order_id: result.razorpay.orderId,
        name: "ElectroHub",
        description: "Electronics order",
        prefill: { name: form.name, contact: form.phone },
        notes: { trackingId: result.order.trackingId },
        theme: { color: "#38bdf8" },
        handler: (payment) => verifyPayment(result.order.trackingId, payment),
        modal: {
          ondismiss: () => setError(`Payment was not completed. Your tracking ID is ${result.order.trackingId}; payment is still pending.`),
        },
      });
      checkout.on("payment.failed", (payment) => {
        const reason = payment.error?.description || "Payment failed.";
        setError(`${reason} Tracking ID: ${result.order.trackingId}. Retry payment here or contact the shop.`);
      });
      checkout.open();
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setBusy(false);
    }
  };

  if (placedOrder) {
    return (
      <>
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow">Order received</span>
            <h1>Thank you for <span className="grad">your order</span></h1>
            <p>{placedOrder.paymentStatus === "paid" ? "Payment verified successfully." : "Your cash-on-delivery order has been placed."}</p>
          </div>
        </section>
<section className="section checkout-section">
           <div className="container order-confirmation">
            <h2>Order tracking ID</h2>
            <p className="tracking-code">{placedOrder.trackingId}</p>
            <p>Delivery: {config.deliveryEstimate} · {config.deliveryCharge === 0 ? "Free delivery" : formatPrice(config.deliveryCharge)}</p>
            <Link className="btn btn-amber" to={`/track-order?id=${encodeURIComponent(placedOrder.trackingId)}`}>
              Track this order
            </Link>
          </div>
        </section>
      </>
    );
  }

  if (!cart.length) {
    return (
      <>
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow">Checkout</span>
            <h1>Your order <span className="grad">is empty</span></h1>
            <p>Products page se item choose karke yahan order karein.</p>
          </div>
        </section>
<section className="section checkout-section">
           <div className="container order-confirmation">
            <Link className="btn btn-amber" to="/products">Browse products</Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Secure checkout</span>
          <h1>Complete your <span className="grad">order</span></h1>
          <p>Delivery available across {config.deliveryArea}; estimate {config.deliveryEstimate}.</p>
        </div>
      </section>
<section className="section checkout-section">
          <div className="container checkout-layout">
          <form className="form checkout-form" onSubmit={submitOrder}>
            <h2>Delivery details</h2>
            <label>
              Full name
              <input name="name" autoComplete="name" maxLength={100} value={form.name} onChange={setField} required disabled={Boolean(paymentSession)} />
            </label>
            <label>
              Mobile number
              <input name="phone" type="tel" inputMode="numeric" autoComplete="tel" maxLength={10} pattern="[6-9][0-9]{9}" value={form.phone} onChange={setField} required disabled={Boolean(paymentSession)} />
            </label>
            <label>
              Address
              <textarea name="address" autoComplete="street-address" maxLength={300} rows={3} value={form.address} onChange={setField} required disabled={Boolean(paymentSession)} />
            </label>
            <div className="checkout-fields">
              <label>
                City / town
                <input name="city" autoComplete="address-level2" maxLength={100} value={form.city} onChange={setField} required disabled={Boolean(paymentSession)} />
              </label>
              <label>
                Haryana PIN code
                <input name="pincode" inputMode="numeric" autoComplete="postal-code" maxLength={6} pattern="(12|13)[0-9]{4}" value={form.pincode} onChange={setField} required disabled={Boolean(paymentSession)} />
              </label>
            </div>

            <fieldset className="payment-options" disabled={Boolean(paymentSession)}>
              <legend>Payment method</legend>
              <label className="payment-option">
                <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
                <span><strong>Cash on delivery</strong><small>Pay when your order arrives</small></span>
              </label>
              <label className={`payment-option ${config.paymentMethods.razorpay ? "" : "payment-disabled"}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="razorpay"
                  checked={paymentMethod === "razorpay"}
                  onChange={() => setPaymentMethod("razorpay")}
                  disabled={!config.paymentMethods.razorpay}
                />
                <span><strong>Online payment</strong><small>{config.paymentMethods.razorpay ? "Secure payment by Razorpay" : "Temporarily unavailable; choose COD"}</small></span>
              </label>
            </fieldset>
            {configError && <p className="status err">{configError}</p>}
            {error && <p className="status err" role="alert">{error}</p>}
            <button className="btn btn-amber checkout-submit" type="submit" disabled={busy || Boolean(configError)}>
              {busy ? "Please wait…" : paymentProof ? "Retry payment verification" : paymentSession ? "Retry online payment" : paymentMethod === "cod" ? "Place COD order" : "Pay securely"}
            </button>
          </form>

          <aside className="order-summary">
            <h2>Order summary</h2>
            <div className="checkout-items">
              {cart.map((item) => (
                <div className="checkout-item" key={item.id}>
                  <div><strong>{item.name}</strong><span>{formatPrice(item.price)} each</span></div>
                  <div className="quantity-control">
                    <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => changeQuantity(item.id, -1)} disabled={item.quantity <= 1 || Boolean(paymentSession)}>−</button>
                    <span>{item.quantity}</span>
                    <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => changeQuantity(item.id, 1)} disabled={item.quantity >= 5 || Boolean(paymentSession)}>+</button>
                  </div>
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                </div>
              ))}
            </div>
            <div className="summary-line"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
            <div className="summary-line"><span>Delivery ({config.deliveryArea})</span><strong>{config.deliveryCharge === 0 ? "Free" : formatPrice(config.deliveryCharge)}</strong></div>
            <div className="summary-line summary-total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
            <p className="delivery-estimate">Estimated delivery: <strong>{config.deliveryEstimate}</strong></p>
            <p className="checkout-disclaimer">Prices are online references; the shop will confirm stock and final availability. Do not retry a payment if your bank shows it succeeded—contact the shop with your tracking ID.</p>
          </aside>
        </div>
      </section>
    </>
  );
}
