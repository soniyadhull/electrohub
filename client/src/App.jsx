import { Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import FloatingButtons from "./components/FloatingButtons.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Gallery from "./pages/Gallery.jsx";
import Contact from "./pages/Contact.jsx";
import Products from "./pages/Products.jsx";
import Checkout from "./pages/Checkout.jsx";
import TrackOrder from "./pages/TrackOrder.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import OrderAdmin from "./pages/OrderAdmin.jsx";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/admin/orders" element={<OrderAdmin />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
