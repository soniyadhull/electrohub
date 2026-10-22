import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal.jsx";
import Counter from "../components/Counter.jsx";
import Img from "../components/Img.jsx";
import { SHOP, IMG, STATS, OFFERS, CATEGORIES, BRANDS, FEATURES, REVIEWS } from "../data.js";

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
              <a className="btn btn-amber" href={`tel:${SHOP.phone}`}>
                📞 Call Now
              </a>
              <a className="btn btn-ghost" href={`https://wa.me/${SHOP.wa}`} target="_blank" rel="noreferrer">
                💬 WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div
            className="hero-card"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.div animate={{ y: [0, -14, 0] }} transition={{ repeat: Infinity, duration: 4.5 }}>
              <Img src={IMG.phone} alt="Latest smartphone" />
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
                  <Img className="cat-img" src={c.img} alt={c.title} />
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
