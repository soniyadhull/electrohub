import { Link } from "react-router-dom";
import { SHOP } from "../data.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container foot-grid">
        <div>
          <div className="logo">
            <span className="logo-bolt">⚡</span>
            Electro<span className="logo-accent">Hub</span>
          </div>
          <p className="muted">
            Narwana ki bharosemand electronics shop. 100% original products, sahi daam aur pakki service.
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div>
          <h4>Contact</h4>
          <p className="muted">📍 {SHOP.address}</p>
          <p className="muted">🕘 {SHOP.hours}</p>
          <a href={`tel:${SHOP.phone}`}>📞 {SHOP.phone}</a>
          <a href={`https://wa.me/${SHOP.wa}`} target="_blank" rel="noreferrer">
            💬 WhatsApp
          </a>
        </div>
      </div>

      <div className="copy">
        © {new Date().getFullYear()} <b>ElectroHub</b>, Narwana, Jind. All rights reserved.
      </div>
    </footer>
  );
}
