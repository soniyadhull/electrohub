import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { SHOP } from "../data.js";

const links = [
  ["/", "Home"],
  ["/products", "Products"],
  ["/about", "About"],
  ["/gallery", "Gallery"],
  ["/contact", "Contact"],
  ["/track-order", "Track Order"],
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

        <nav id="primary-navigation" className={`nav-links ${open ? "open" : ""}`}>
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
            <Phone size={16} aria-hidden="true" /> Call Now
          </a>
        </nav>

        {open && <button className="nav-backdrop" aria-label="Close navigation menu" onClick={() => setOpen(false)} />}

        <button
          className="burger"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>
    </motion.header>
  );
}
