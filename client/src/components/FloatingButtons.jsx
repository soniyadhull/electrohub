import { SHOP, WHATSAPP_MESSAGE } from "../data.js";
import { Phone } from "lucide-react";

export default function FloatingButtons() {
  return (
    <div className="floaters">
      <a className="fab call" href={`tel:${SHOP.phone}`} aria-label="Call ElectroHub" title="Call ElectroHub">
        <Phone size={22} strokeWidth={2.3} aria-hidden="true" />
      </a>
      <a
        className="fab wa"
        href={`https://wa.me/${SHOP.wa}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message ElectroHub on WhatsApp"
        title="WhatsApp"
      >
        <svg width="25" height="25" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 1.5a10.47 10.47 0 0 0-9 15.82L1.5 22.5l5.33-1.4A10.5 10.5 0 1 0 12 1.5Z"
          />
          <path
            fill="#fff"
            d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.56 3.58.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.19 2.46.56 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2Z"
          />
        </svg>
      </a>
    </div>
  );
}
