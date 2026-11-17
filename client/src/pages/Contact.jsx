import { useState } from "react";
import Reveal from "../components/Reveal.jsx";
import { SHOP, WHATSAPP_MESSAGE } from "../data.js";
import { API } from "../api.js";

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
      const res = await fetch(`${API}/api/contact`, {
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
              Contact <span className="grad">Us</span> – Electronics Shop Narwana, Jind
            </h1>
            <p>Price, stock ya repair ke liye humse poochein</p>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container contact-grid">
          <Reveal x={-50} y={0}>
            <div className="info">
              <div className="info-i">
                <span className="info-ico">📍</span>
                <div>
                  <h2>Address</h2>
                  <p>{SHOP.address}</p>
                </div>
              </div>
              <div className="info-i">
                <span className="info-ico">📞</span>
                <div>
                  <h2>Phone</h2>
                  <a href={`tel:${SHOP.phone}`}>{SHOP.phone}</a>
                </div>
              </div>
              <div className="info-i">
                <span className="info-ico">💬</span>
                <div>
                  <h2>WhatsApp</h2>
                  <a href={`https://wa.me/${SHOP.wa}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`} target="_blank" rel="noreferrer">
                    Chat karein
                  </a>
                </div>
              </div>
               <div className="info-i">
                 <span className="info-ico">🕘</span>
                 <div>
                   <h2>Timing</h2>
                   <p>Roz {SHOP.hours}</p>
                 </div>
               </div>
               <div className="info-i">
                 <span className="info-ico">🌐</span>
                 <div>
                   <h2>Social Media</h2>
                   <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
                     <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">📘 Facebook</a>
                     <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">📸 Instagram</a>
                     <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">▶️ YouTube</a>
                   </div>
                 </div>
               </div>
            </div>
          </Reveal>

          <Reveal x={50} y={0}>
            <form className="form" onSubmit={submit}>
              <h2>Enquiry bhejein</h2>
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

          <div style={{ marginTop: 40 }}>
            <h3 style={{ marginBottom: 20 }}>Common Questions</h3>
            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ padding: "16px 18px", background: "var(--card)", border: "1px solid var(--line)", borderRadius: "14px" }}>
                <h4 style={{ marginBottom: 4 }}>What is the shop timing?</h4>
                <p className="muted" style={{ fontSize: 14, lineHeight: 1.6 }}>ElectroHub is open daily from {SHOP.hours} at Chamela Colony, Narwana, Jind, Haryana.</p>
              </div>
              <div style={{ padding: "16px 18px", background: "var(--card)", border: "1px solid var(--line)", borderRadius: "14px" }}>
                <h4 style={{ marginBottom: 4 }}>Do you deliver outside Narwana?</h4>
                <p className="muted" style={{ fontSize: 14, lineHeight: 1.6 }}>We deliver across Haryana including Jind and nearby areas. Call or WhatsApp to confirm delivery to your location.</p>
              </div>
              <div style={{ padding: "16px 18px", background: "var(--card)", border: "1px solid var(--line)", borderRadius: "14px" }}>
                <h4 style={{ marginBottom: 4 }}>Can I check product price before visiting?</h4>
                <p className="muted" style={{ fontSize: 14, lineHeight: 1.6 }}>Yes. Call {SHOP.phone} or message us on WhatsApp. Our staff will confirm the current price and stock instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
