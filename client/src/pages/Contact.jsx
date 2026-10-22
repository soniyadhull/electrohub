import { useState } from "react";
import Reveal from "../components/Reveal.jsx";
import { SHOP } from "../data.js";

const empty = { name: "", phone: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [busy, setBusy] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setStatus({ type: "", msg: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus({ type: "ok", msg: "✅ Dhanyavaad! Hum jaldi aapse sampark karenge." });
        setForm(empty);
      } else {
        setStatus({ type: "err", msg: data.error || "Kuch galat hua, dobara try karein." });
      }
    } catch {
      setStatus({ type: "err", msg: "Server se connect nahi ho paya. Seedha call/WhatsApp karein." });
    }
    setBusy(false);
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Get in Touch</span>
          <h1>
            Contact <span className="grad">Us</span>
          </h1>
          <p>Price, stock ya repair ke liye humse poochein</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <Reveal x={-50} y={0}>
            <div className="info">
              <div className="info-i">
                <span className="info-ico">📍</span>
                <div>
                  <h4>Address</h4>
                  <p>{SHOP.address}</p>
                </div>
              </div>
              <div className="info-i">
                <span className="info-ico">📞</span>
                <div>
                  <h4>Phone</h4>
                  <a href={`tel:${SHOP.phone}`}>{SHOP.phone}</a>
                </div>
              </div>
              <div className="info-i">
                <span className="info-ico">💬</span>
                <div>
                  <h4>WhatsApp</h4>
                  <a href={`https://wa.me/${SHOP.wa}`} target="_blank" rel="noreferrer">
                    Chat karein
                  </a>
                </div>
              </div>
              <div className="info-i">
                <span className="info-ico">🕘</span>
                <div>
                  <h4>Timing</h4>
                  <p>Roz {SHOP.hours}</p>
                </div>
              </div>
              <iframe title="ElectroHub location" src={SHOP.map} loading="lazy" className="map" />
            </div>
          </Reveal>

          <Reveal x={50} y={0}>
            <form className="form" onSubmit={submit}>
              <h3>Enquiry bhejein</h3>
              <label>
                Aapka naam
                <input name="name" placeholder="Poora naam likhein" value={form.name} onChange={change} required />
              </label>
              <label>
                Mobile number
                <input
                  name="phone"
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={change}
                  maxLength={10}
                  inputMode="numeric"
                  required
                />
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Aapko kya chahiye? (product / repair / EMI)"
                  value={form.message}
                  onChange={change}
                  required
                />
              </label>
              <button className="btn btn-amber" type="submit" disabled={busy}>
                {busy ? "Bhej rahe hain…" : "Send Message 🚀"}
              </button>
              {status.msg && <p className={`status ${status.type}`}>{status.msg}</p>}
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
