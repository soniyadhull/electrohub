import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SHOP } from "../data.js";

const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/gallery", "Gallery"],
  ["/contact", "Contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header className="nav" initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
      <div className="container nav-in">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <span className="logo-bolt">⚡</span>
          Electro<span className="logo-accent">Hub</span>
        </Link>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {label}
            </NavLink>
          ))}
          <a className="btn btn-amber btn-sm" href={`tel:${SHOP.phone}`}>
            📞 Call Now
          </a>
        </nav>

        <button className="burger" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
          {open ? "✕" : "☰"}
        </button>
      </div>
    </motion.header>
  );
}
