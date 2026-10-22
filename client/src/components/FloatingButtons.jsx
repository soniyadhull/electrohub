import { SHOP } from "../data.js";

export default function FloatingButtons() {
  return (
    <div className="floaters">
      <a className="fab call" href={`tel:${SHOP.phone}`} aria-label="Call">📞</a>
      <a className="fab wa" href={`https://wa.me/${SHOP.wa}?text=Hello%20ElectroHub`} target="_blank" rel="noreferrer" aria-label="WhatsApp">💬</a>
    </div>
  );
}
