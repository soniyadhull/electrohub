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
- **Home** — hero, stats counters, Today's Offers, categories, Top Brands, why-us, customer reviews, CTA
- **About** — shop story (Hinglish), checklist, Mission / Vision / Values
- **Gallery** — masonry photo grid + click-to-zoom lightbox
- **Contact** — info cards, Google map, enquiry form (POST `/api/contact`)

## Production
```
npm run build
npm start --prefix server   # http://localhost:5000 (client/dist serve hoti hai)
```

## Badalne ki jagah
- **Shop details** (naam / number / WhatsApp / address / timing / map): `client/src/data.js` → `SHOP`
- **Photos** (Unsplash links ya apni files): `client/src/data.js` → `IMG`, `GALLERY`
- **Offers / Brands / Reviews / Categories**: `client/src/data.js`
- **Colors + fonts + poora design**: `client/src/index.css` (sabse upar `:root` mein CSS variables)
- Aapke customers ke messages: `server/messages.json`

### Theme colors (`client/src/index.css` `:root`) — Light / Clean theme
| Variable | Color | Use |
|---|---|---|
| `--bg` | `#f5f8fc` | Page background (soft light) |
| `--primary` | `#2563eb` | Primary accent (blue) |
| `--primary-2` | `#7c3aed` | Secondary accent (violet) |
| `--amber` | `#f59e0b` | Buttons & highlights |
| `--text` | `#0f1b34` | Main dark text |
| `--muted` | `#5a6685` | Secondary text |

Fonts: **Poppins** (headings) + **Inter** (body), Google Fonts se.
