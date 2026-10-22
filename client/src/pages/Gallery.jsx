import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Img from "../components/Img.jsx";
import { GALLERY } from "../data.js";

export default function Gallery() {
  const [sel, setSel] = useState(null);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Our Gallery</span>
          <h1>
            Photo <span className="grad">Gallery</span>
          </h1>
          <p>Hamare products aur shop ki ek jhalak</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="masonry">
            {GALLERY.map((g, i) => (
              <motion.div
                key={g.label}
                className={`m-item ${g.tall ? "tall" : ""}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.07, duration: 0.5 }}
                onClick={() => setSel(g)}
              >
                <Img src={g.img} alt={g.label} />
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
              alt={sel.label}
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
