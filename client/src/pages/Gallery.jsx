import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Img from "../components/Img.jsx";
import { GALLERY } from "../data.js";

const GALLERY_LABELS = {
  "Electronics": "Electronics products at ElectroHub Narwana",
  "Smartphones": "Latest smartphones – Samsung mobiles in Narwana",
  "Smart TV": "Samsung Smart TV 43 inch – best price in Narwana",
  "Laptops": "Samsung Galaxy Book laptops – study & office",
  "Headphones": "Audio headphones & speakers – best price",
  "Smart Watches": "Smart watches for fitness & style",
  "Circuit & Repair": "Electronics repair service at ElectroHub",
  "Mobile Accessories": "Mobile chargers, cables & covers",
};

export default function Gallery() {
  const [sel, setSel] = useState(null);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Product Gallery</span>
          <h1>
            Photo <span className="grad">Gallery</span>
          </h1>
          <p>ElectroHub products, store ambience and customer moments at Narwana, Jind</p>
        </div>
      </section>

      <section className="section gallery-section">
        <div className="container">
          <h2 className="section-head">Explore Our Collection</h2>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <Link className="btn btn-amber" to="/products">View Products & Prices →</Link>
          </div>
          <div className="masonry">
            {GALLERY.map((g, i) => (
              <motion.div
                key={g.label}
                className={`m-item ${g.label === "Smart TV" ? "m-item-tv" : ""}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.07, duration: 0.5 }}
                onClick={() => setSel(g)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSel(g);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View ${g.label}`}
              >
                <Img src={g.img} alt={GALLERY_LABELS[g.label] || g.label} />
                <div className="m-cap">{g.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {sel && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSel(null)}
          >
            <motion.img
              src={sel.img}
              alt={GALLERY_LABELS[sel.label] || sel.label}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            />
            <button className="lb-x" aria-label="Close">
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
