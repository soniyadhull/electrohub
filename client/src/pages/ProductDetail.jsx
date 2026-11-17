import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Img from "../components/Img.jsx";
import { PRODUCTS, CATEGORIES, SHOP, WHATSAPP_MESSAGE } from "../data.js";

const formatPrice = (price) => new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
}).format(price);

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id);
  const category = CATEGORIES.find((c) => c.title === product?.category);

  if (!product) {
    return (
      <section className="section">
        <div className="container">
          <h1>Product not found</h1>
          <p>We couldn’t find the product you’re looking for.</p>
          <Link className="btn btn-amber" to="/products">
            Browse all products →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section product-detail-page">
      <div className="container">
        <nav className="product-breadcrumbs" style={{ marginBottom: 16, fontSize: 13, color: "var(--muted)" }}>
          <Link to="/" style={{ color: "var(--primary)", textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 6px" }}>/</span>
          <Link to="/products" style={{ color: "var(--primary)", textDecoration: "none" }}>Products</Link>
          <span style={{ margin: "0 6px" }}>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-detail-grid">
          <div className="product-detail-image">
            <Img
              className="product-detail-img"
              src={product.image}
              alt={`${product.name} – ${product.category}, ₹${formatPrice(product.price)} at ElectroHub Narwana`}
              priority
            />
          </div>

          <div className="product-detail-info">
            <span className="product-detail-category" style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {product.category}
            </span>
            <h1>{product.name}</h1>
            <p className="product-detail-desc" style={{ color: "var(--muted)", lineHeight: 1.7, margin: "16px 0" }}>
              {product.desc}
            </p>

            <div className="product-detail-prices" style={{ margin: "20px 0" }}>
              <span className="product-detail-price" style={{ fontSize: "24px", fontWeight: 700 }}>
                {formatPrice(product.price)}
              </span>
              <span className="product-detail-mrp" style={{ marginLeft: 10, fontSize: "16px", color: "var(--muted)" }}>
                MRP {formatPrice(product.mrp)}
              </span>
            </div>

            <div className="product-detail-actions" style={{ display: "flex", flexDirection: "column", gap: 12, margin: "24px 0" }}>
              <Link
                className="btn btn-amber"
                to="/checkout"
                state={{ items: [{ productId: product.id, quantity: 1 }] }}
              >
                Add to Cart
              </Link>
              <a
                className="btn btn-ghost"
                href={`https://wa.me/${SHOP.wa}?text=${encodeURIComponent(`${WHATSAPP_MESSAGE}\n\nProduct: ${product.name}\nCategory: ${product.category}\nPrice: ₹${formatPrice(product.price)}\nPlease confirm price and stock.`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Confirm on WhatsApp
              </a>
            </div>

            {category && (
              <Link
                className="btn btn-outline-light"
                to={`/category/${encodeURIComponent(category.title.toLowerCase().replace(/\s+/g, "-"))}`}
                style={{ marginTop: 8 }}
              >
                Browse all {category.title} →
              </Link>
            )}

            <p className="product-detail-note" style={{ fontSize: 13, color: "var(--muted)", marginTop: 20 }}>
              Original product with brand warranty and GST bill. Cash on delivery available. Delivery in Narwana and nearby areas of Haryana (3–7 business days).
            </p>
          </div>
        </div>

        <div className="product-detail-related" style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--line)" }}>
          <h2 style={{ marginBottom: 20 }}>Related Products</h2>
          <div className="product-detail-related-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).map((p) => (
              <div key={p.id} className="product-detail-related-card" style={{ padding: "14px 16px", background: "var(--card)", border: "1px solid var(--line)", borderRadius: "12px" }}>
                <Img className="product-detail-related-img" src={p.image} alt={`${p.name} – ${p.category}`} />
                <span className="product-detail-related-cat" style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>{p.category}</span>
                <h3 style={{ marginBottom: 8 }}>{p.name}</h3>
                <span style={{ fontWeight: 700 }}>{formatPrice(p.price)}</span>
                <Link className="btn btn-ghost" to={`/products/${p.id}`} style={{ marginTop: 8, fontSize: 13 }}>
                  View details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
