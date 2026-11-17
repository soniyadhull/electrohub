import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Img from "../components/Img.jsx";
import { PRODUCTS, CATEGORIES, SHOP, WHATSAPP_MESSAGE } from "../data.js";

const formatPrice = (price) => new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
}).format(price);

const slugify = (text) => String(text).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");

export default function Category() {
  const { slug } = useParams();
  const category = CATEGORIES.find((c) => slugify(c.title) === slug);

  if (!category) {
    return (
      <section className="section">
        <div className="container">
          <h1>Category not found</h1>
          <p>We couldn’t find the category you’re looking for.</p>
          <Link className="btn btn-amber" to="/products">
            Browse all products →
          </Link>
        </div>
      </section>
    );
  }

  const categoryProducts = PRODUCTS.filter((p) => p.category === category.title);

  return (
    <section className="section category-page">
      <div className="container">
        <nav className="category-breadcrumbs" style={{ marginBottom: 20, fontSize: 13, color: "var(--muted)" }}>
          <Link to="/" style={{ color: "var(--primary)", textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 6px" }}>/</span>
          <Link to="/products" style={{ color: "var(--primary)", textDecoration: "none" }}>Products</Link>
          <span style={{ margin: "0 6px" }}>/</span>
          <span>{category.title}</span>
        </nav>

        <div className="category-hero" style={{ marginBottom: 32, padding: "28px 24px", background: "var(--card)", border: "1px solid var(--line)", borderRadius: "16px" }}>
          <Img className="category-img" src={category.img} alt={`${category.title} – ${category.text} at ElectroHub Narwana`} priority />
          <div className="category-info" style={{ marginTop: 20 }}>
            <h1>{category.title}</h1>
            <p className="category-desc" style={{ color: "var(--muted)", lineHeight: 1.7, marginTop: 10 }}>
              {category.desc}
            </p>
            <div className="category-count" style={{ marginTop: 12, fontSize: 13, color: "var(--muted)" }}>
              {categoryProducts.length} product{categoryProducts.length !== 1 ? "s" : ""} available
            </div>
          </div>
        </div>

        {categoryProducts.length > 0 ? (
          <>
            <h2 style={{ marginBottom: 20 }}>{category.title} at ElectroHub Narwana</h2>
            <div className="category-product-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
              {categoryProducts.map((p) => (
                <article key={p.id} className="category-product-card" style={{ padding: "16px 18px", background: "var(--card)", border: "1px solid var(--line)", borderRadius: "14px" }}>
                  <Img className="category-product-img" src={p.image} alt={`${p.name} – ${p.category}, ₹${formatPrice(p.price)} at ElectroHub Narwana`} />
                  <span className="category-product-cat" style={{ fontSize: 12, color: "var(--muted)", display: "block", marginTop: 10, marginBottom: 6 }}>{p.category}</span>
                  <h3 style={{ marginBottom: 8 }}>{p.name}</h3>
                  <span style={{ fontWeight: 700 }}>{formatPrice(p.price)}</span>
                  <span style={{ marginLeft: 8, fontSize: 13, color: "var(--muted)" }}>MRP {formatPrice(p.mrp)}</span>
                  <Link className="btn btn-ghost" to={`/products/${p.id}`} style={{ marginTop: 10, fontSize: 13, display: "inline-block" }}>
                    View details →
                  </Link>
                </article>
              ))}
            </div>
          </>
        ) : (
          <p style={{ color: "var(--muted)", textAlign: "center" }}>
            No products listed in this category yet. Please contact us for availability.
          </p>
        )}

        <div className="category-actions" style={{ marginTop: 32, textAlign: "center" }}>
          <a className="btn btn-amber" href={`https://wa.me/${SHOP.wa}?text=${encodeURIComponent(`${WHATSAPP_MESSAGE}\n\nI am interested in ${category.title} products at ElectroHub Narwana. Please share price and availability.`)}`} target="_blank" rel="noopener noreferrer">
            💬 WhatsApp about {category.title}
          </a>
          <Link className="btn btn-ghost" to="/products" style={{ marginLeft: 10 }}>
            Browse all products →
          </Link>
        </div>
      </div>
    </section>
  );
}
