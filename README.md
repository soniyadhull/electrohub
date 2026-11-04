# ElectroHub Website (React + Node.js)

Premium, fully animated multi-page website for **ElectroHub** — electronics shop in Chamela Colony, Narwana, Jind, Haryana.

## Run karne ka tareeka
1. Node.js (v18+) install karein.
2. VS Code mein is folder ko open karein, terminal kholein:
   ```
   npm run install:all
   npm run dev
   ```
3. Browser mein kholein: http://localhost:5173

`npm run dev` ek saath chalata hai:
- Frontend (Vite): http://localhost:5173
- Backend (Express): http://localhost:5000 (`/api` frontend se proxy hota hai)

## Pages
- **Home** — hero, best sellers, offers, categories, brands, customer reviews, CTA
- **Products** — online price references, stock confirmation, and checkout links
- **Checkout** — Haryana delivery details, COD, and online Razorpay payment when configured
- **Track Order** — public status and delivery estimate using the tracking ID
- **About / Gallery / Contact** — shop information, product photos, and enquiry form

## Orders, delivery and payment
- Delivery is currently configured for Haryana, free of charge, with an estimated **3–7 business days**.
- COD is available. Razorpay online payment is enabled only after valid server credentials are configured; payment is verified by the server before an order is marked paid.
- Order records are stored in `server/orders.json`. Back up this file and restrict access to the server filesystem.
- Staff can manage orders at `/admin/orders`. The page requires `ORDER_ADMIN_KEY`; keep that key private and rotate it if exposed.
- To enable Razorpay, copy `server/.env.example` to `server/.env` and set your Razorpay **Key ID**, **Key Secret**, and a long random `ORDER_ADMIN_KEY`. Never put these values in client code or share them in chat. Restart the server after changing them.
- Product prices are online references; confirm stock and final availability with the shop before payment.

## Production
```
npm run build
npm start --prefix server   # http://localhost:5000 (client/dist serve hoti hai)
```

## Badalne ki jagah
- **Shop details** (naam / number / WhatsApp / address / timing / map): `client/src/data.js` → `SHOP`
- **Photos** (local WebP assets): `client/public/images/` and `client/src/data.js` → `IMG`, `GALLERY`
- **Offers / Brands / Reviews / Categories**: `client/src/data.js`
- **Colors + fonts + poora design**: `client/src/index.css` (sabse upar `:root` mein CSS variables)
- Aapke customers ke messages: `server/messages.json`

### Theme colors (`client/src/index.css` `:root`) — Dark navy / cyan theme
| Variable | Color | Use |
|---|---|---|
| `--bg` | `#0b1220` | Page background |
| `--primary` | `#38bdf8` | Primary accent |
| `--primary-2` | `#22d3ee` | Secondary accent |
| `--amber` | `#f4b740` | Highlight |
| `--text` | `#e8f0ff` | Main text |
| `--muted` | `#a9b8cc` | Secondary text |

Fonts: **Poppins** (headings) + **Inter** (body), Google Fonts se.
