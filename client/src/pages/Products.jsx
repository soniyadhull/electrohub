import { MessageCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Img from "../components/Img.jsx";
import { PRODUCTS, PRODUCTS_PRICE_CHECKED, PRODUCTS_SOURCE, SHOP, WHATSAPP_MESSAGE, CATEGORIES } from "../data.js";

const formatPrice = (price) => new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
}).format(price);

const FAQS = [
  { q: "Are these prices final?", a: "These are Samsung India online listed prices as references. ElectroHub in-store prices may differ. Please call or WhatsApp us to confirm the final price and stock before ordering." },
  { q: "Do you offer home delivery?", a: "Yes. ElectroHub delivers within Narwana and nearby areas of Jind, Haryana. Delivery is free and typically takes 3 to 7 business days." },
  { q: "Can I pay with EMI?", a: "Yes. No-cost EMI is available on major debit and credit cards. You can also pay cash on delivery or through online payment when available." },
  { q: "Do you provide brand warranty?", a: "Every original product sold at ElectroHub comes with the manufacturer brand warranty along with a GST bill for your records." },
  { q: "What about exchange offers?", a: "ElectroHub offers exchange deals where you can trade in your old device when buying a new one. The exact value depends on the product condition and current offer." },
  { q: "Do you offer repair services?", a: "Yes. ElectroHub provides mobile, TV and laptop repair services. Our experienced staff handles most repairs quickly and at reasonable rates." },
];

export default function Products() {
  const location = useLocation();

  return (
    <>
      <nav className="products-breadcrumbs" style={{ marginBottom: 16, fontSize: 13, color: "var(--muted)" }}>
        <Link to="/" style={{ color: "var(--primary)", textDecoration: "none" }}>Home</Link>
        <span style={{ margin: "0 6px" }}>/</span>
        <span>Products</span>
      </nav>

      <section className="page-hero products-hero">
        <div className="container">
          <span className="eyebrow">Price List</span>
          <h1>Products &amp; <span className="grad">Prices</span></h1>
          <p>Current online price references for selected products — mobiles, smart TVs, laptops and audio from Samsung and other trusted brands</p>
        </div>
      </section>

      <section className="section products-list-section">
        <div className="container">
          <p className="price-disclaimer">
          These are Samsung India online listed prices, checked {PRODUCTS_PRICE_CHECKED}. Offers can change. ElectroHub stock and in-store prices may differ; WhatsApp us to confirm before ordering.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 14px", marginBottom: 28, alignItems: "center" }}>
            <span className="muted" style={{ fontWeight: 600 }}>Shop by category:</span>
            {CATEGORIES.map((c) => (
              <a
                key={c.title}
                href={`/category/${String(c.title).toLowerCase().replace(/\s+/g, "-")}`}
                style={{ color: "var(--primary)", fontWeight: 600, fontSize: 14 }}
              >
                {c.title} →
              </a>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px", marginBottom: 36 }}>
            {CATEGORIES.map((c) => (
              <div key={c.title} style={{ padding: "16px 18px", background: "var(--card)", border: "1px solid var(--line)", borderRadius: "14px" }}>
                <h2 style={{ marginBottom: 4 }}>{c.icon} {c.title}</h2>
                <p className="muted" style={{ fontSize: 13.5, lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="product-grid">
            {PRODUCTS.map((product) => (
              <article className="product-card" key={product.name}>
                <Img className="product-img" src={product.image} alt={`${product.name} – ${product.category}, price ₹${product.price} at ElectroHub Narwana`} />
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h2>{product.name}</h2>
                  {product.desc && <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6, margin: "8px 0" }}>{product.desc}</p>}
                  <div className="product-prices">
                    <span className="product-price">{formatPrice(product.price)}</span>
                    <span className="product-mrp">MRP {formatPrice(product.mrp)}</span>
                  </div>
                  <a className="product-source" href={PRODUCTS_SOURCE} target="_blank" rel="noreferrer">
                    Samsung India price source ↗
                  </a>
                  <a
                    className="btn btn-amber product-contact"
                    href={`https://wa.me/${SHOP.wa}?text=${encodeURIComponent(`${WHATSAPP_MESSAGE}\n\n${product.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={17} aria-hidden="true" /> Confirm price &amp; stock
                  </a>
                  <Link
                    className="btn btn-amber product-order"
                    to="/checkout"
                    state={{ items: [{ productId: product.id, quantity: 1 }] }}
                  >
                     Add to Cart
                   </Link>
                  <Link className="btn btn-ghost" to={`/products/${product.id}`} style={{ marginLeft: 8, fontSize: 13 }}>
                    View details →
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 36, textAlign: "center" }}>
            <p className="muted" style={{ marginBottom: 14 }}>Need help choosing? Compare prices, check stock or ask about EMI and exchange.</p>
            <a className="btn btn-amber" href={`https://wa.me/${SHOP.wa}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`} target="_blank" rel="noopener noreferrer">
              WhatsApp ElectroHub →
            </a>
            <Link className="btn btn-ghost" to="/contact" style={{ marginLeft: 10 }}>Contact Us →</Link>
          </div>
          <div style={{ marginTop: 48 }}>
            <h2 style={{ textAlign: "center", marginBottom: 28 }}>Frequently Asked Questions</h2>
            <div style={{ display: "grid", gap: 14, maxWidth: 820, margin: "0 auto" }}>
              {FAQS.map((f, i) => (
                <div key={i} style={{ padding: "18px 20px", background: "var(--card)", border: "1px solid var(--line)", borderRadius: "14px" }}>
                  <h3 style={{ marginBottom: 6 }}>{f.q}</h3>
                  <p className="muted" style={{ fontSize: 14, lineHeight: 1.65 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}