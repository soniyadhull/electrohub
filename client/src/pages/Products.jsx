import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Img from "../components/Img.jsx";
import { PRODUCTS, PRODUCTS_PRICE_CHECKED, PRODUCTS_SOURCE, SHOP, WHATSAPP_MESSAGE } from "../data.js";

const formatPrice = (price) => new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
}).format(price);

export default function Products() {
  return (
    <>
      <section className="page-hero products-hero">
        <div className="container">
          <span className="eyebrow">Product Price List</span>
          <h1>Products &amp; <span className="grad">Prices</span></h1>
          <p>Current online price references for selected products</p>
        </div>
      </section>

      <section className="section products-list-section">
        <div className="container">
          <p className="price-disclaimer">
          These are Samsung India online listed prices, checked {PRODUCTS_PRICE_CHECKED}. Offers can change. ElectroHub stock and in-store prices may differ; WhatsApp us to confirm before ordering.
          </p>

          <div className="product-grid">
            {PRODUCTS.map((product) => (
              <article className="product-card" key={product.name}>
                <Img className="product-img" src={product.image} alt={product.name} />
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h2>{product.name}</h2>
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
<Link className="btn btn-amber product-order" to="/checkout" state={{ items: [{ productId: product.id, quantity: 1 }] }}>
                     Add to Cart
                   </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}