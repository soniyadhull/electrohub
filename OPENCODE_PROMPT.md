# OpenCode Prompt (copy-paste karein)

Create a professional, multi-page, fully animated website for an electronics shop named "ElectroHub".

Tech stack: React 18 (Vite) + react-router-dom + framer-motion on the frontend, Node.js + Express on the backend. Folder layout: `client/` and `server/`, with a root package.json that runs both together using `concurrently` (`npm run dev`).

Business details:
- Name: ElectroHub
- Address: Narwana, Jind, Haryana
- Phone / WhatsApp: 8053242544
- Sells: mobiles, smart TVs, laptops, audio, smart watches, accessories; also repair, exchange, EMI, home delivery

Pages (React Router): Home, About, Gallery, Contact.
- Home: animated hero with headline, "Call Now" and WhatsApp buttons, floating product card; animated stats counters; category cards with hover effects; "Why choose us" section; CTA banner.
- About: shop story, mission/vision/values, checklist, image with slide-in animation.
- Gallery: masonry grid of professional product photos (Unsplash URLs) with hover captions and a click-to-zoom lightbox.
- Contact: address, phone, WhatsApp, timing, Google Map iframe for Narwana Jind, and an enquiry form that POSTs to `/api/contact`.

Backend: Express with `POST /api/contact` (validate name, 10-digit Indian mobile number, message; save into messages.json) and `GET /api/info`. Serve `client/dist` in production.

Design: dark modern theme, blue-to-orange gradient accent, Poppins font, sticky animated navbar with mobile hamburger menu, page transition animations, scroll-reveal animations, floating WhatsApp and Call buttons, fully responsive, image fallback if an image fails to load, SEO meta tags.

Make the code clean, split into components, and include a README with run instructions.
