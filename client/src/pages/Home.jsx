import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal.jsx";
import Counter from "../components/Counter.jsx";
import Img from "../components/Img.jsx";
import { SHOP, IMG, STATS, PRODUCTS, OFFERS, CATEGORIES, BRANDS, FEATURES, REVIEWS, WHATSAPP_MESSAGE } from "../data.js";

const formatPrice = (price) => new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
}).format(price);

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg">
          <Img src={IMG.hero} alt="Electronics store" />
        </div>
        <div className="blob b1" />
        <div className="blob b2" />

        <div className="container hero-in">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="chip">🔥 Diwali Special Offers</span>
            <h1>
              Best Price on <span className="grad">Mobiles, TVs &amp; Electronics</span>
            </h1>
            <p className="hero-sub">
              Narwana ki bharosemand electronics shop. 100% original products, brand warranty aur no-cost EMI ke saath.
            </p>
            <div className="hero-btns">
              <motion.a className="btn btn-amber" href={`tel:${SHOP.phone}`} whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                📞 Call Now
              </motion.a>
              <motion.a
                className="btn hero-wa-button"
                href={`https://wa.me/${SHOP.wa}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Message ElectroHub on WhatsApp"
                title="WhatsApp"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#25D366"
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.371-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64.001 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.89c-.001 2.096.547 4.142 1.588 5.946L0 24l6.335-1.662a11.87 11.87 0 0 0 5.708 1.455h.005c6.554 0 11.89-5.335 11.893-11.89a11.82 11.82 0 0 0-3.477-8.415Z"
                  />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            className="hero-card"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.div
              className="hero-product hero-product-phone"
              animate={{ y: [0, -12, 0], rotate: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            >
              <Img src={IMG.phone} alt="Latest smartphone" />
              <span>Smartphones</span>
            </motion.div>
            <motion.div
              className="hero-product hero-product-audio"
              animate={{ y: [0, 10, 0], rotate: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <Img src={IMG.audio} alt="Headphones and audio products" />
              <span>Headphones</span>
            </motion.div>
            <motion.div
              className="hero-product hero-product-tv"
              animate={{ y: [0, -9, 0], rotate: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
            >
              <Img className="hero-tv-image" src={IMG.tv} alt="Smart television" />
              <span>Smart TVs</span>
            </motion.div>
            <span className="tag t1">⭐ Top Brands</span>
            <span className="tag t2">🛡️ Warranty</span>
          </motion.div>
        </div>
      </section>

      <section className="strip">
        <div className="container strip-in">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="stat-num">
                <Counter to={s.n} suffix={s.s} />
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section best-sellers">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Customer Favourites</span>
              <h2 className="title">
                Best <span className="grad">Sellers</span>
              </h2>
              <p className="sub">Popular smartphones, genuine products aur brand warranty ke saath</p>
            </div>
          </Reveal>
          <div className="best-seller-grid">
            {PRODUCTS.map((product, index) => (
              <Reveal key={product.name} delay={index * 0.08}>
                <article className="best-seller-card">
                  <div className="best-seller-image-wrap">
                    <Img className="best-seller-image" src={product.image} alt={product.name} />
                    <span className="best-seller-badge">Popular pick</span>
                  </div>
                  <div className="best-seller-info">
                    <span className="product-category">{product.category}</span>
                    <h3>{product.name}</h3>
                    <div className="product-prices">
                      <span className="product-price">{formatPrice(product.price)}</span>
                      <span className="product-mrp">MRP {formatPrice(product.mrp)}</span>
                    </div>
                    <Link className="best-seller-link" to="/products">
                      View details <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="best-seller-note">Online price references; please confirm in-store price and availability.</p>
          <div className="best-seller-action">
            <Link className="btn btn-amber" to="/products">
              Shop Now <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Limited Time</span>
              <h2 className="title">
                Today&apos;s <span className="grad">Offers</span>
              </h2>
              <p className="sub">Diwali tak ke special deals — jaldi karein, stock limited hai!</p>
            </div>
          </Reveal>
          <div className="grid3">
            {OFFERS.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.1}>
                <div className="offer-card">
                  <div className="offer-ico">{o.icon}</div>
                  <h3>{o.title}</h3>
                  <p>{o.text}</p>
                  <a className="offer-link" href={`tel:${SHOP.phone}`}>
                    Call now to book →
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Shop by Category</span>
              <h2 className="title">
                Hamari <span className="grad">Categories</span>
              </h2>
              <p className="sub">Jo chahiye, sab ek hi jagah</p>
            </div>
          </Reveal>
          <div className="grid3">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.07}>
                <div className="cat-card">
                  <Img className={`cat-img ${c.title === "Smart TVs" ? "cat-img-tv" : ""}`} src={c.img} alt={c.title} />
                  <div className="cat-body">
                    <div className="cat-title-row">
                      <span className="cat-ico">{c.icon}</span>
                      <h3>{c.title}</h3>
                    </div>
                    <p>{c.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Trusted Brands</span>
              <h2 className="title">
                Top <span className="grad">Brands</span>
              </h2>
              <p className="sub">Aapke pasandida saare brands, ek hi shop par</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="brands">
              {BRANDS.map((b) => (
                <span className="brand" key={b}>
                  {b}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Why ElectroHub</span>
              <h2 className="title">
                Hum par <span className="grad">Bharosa</span> kyun?
              </h2>
            </div>
          </Reveal>
          <div className="grid4">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08}>
                <div className="feat-card">
                  <div className="feat-ico">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Customer Love</span>
              <h2 className="title">
                Logon ki <span className="grad">Ray</span>
              </h2>
              <p className="sub">Narwana aur Jind ke customers ka bharosa</p>
            </div>
          </Reveal>
          <div className="grid3">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.1}>
                <div className="rev-card">
                  <span className="quote">”</span>
                  <div className="stars">{"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</div>
                  <p className="rev-text">{r.text}</p>
                  <div className="rev-name">
                    {r.name} <span>· {r.place}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="cta">
              <h2>Kuch khareedna hai? Aaj hi sampark karein!</h2>
              <p>Price aur stock ke liye call karein, WhatsApp par message bhejein, ya seedha shop par aayein.</p>
              <div className="cta-btns">
                <a className="btn btn-white" href={`tel:${SHOP.phone}`}>
                  📞 Call {SHOP.phone}
                </a>
                <Link className="btn btn-outline-light" to="/contact">
                  Contact Us →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
