# ElectroHub SEO Maintenance Guide

This guide explains how to add new products, categories, and pages without breaking SEO. The system is **data-driven** — no manual SEO edits are needed per page.

---

## Architecture Overview

| File | Purpose |
|------|---------|
| `client/src/seo.js` | Central SEO utility — titles, descriptions, schemas, OG tags, canonical URLs, validation |
| `client/src/main.jsx` | Applies SEO tags dynamically based on route; injects JSON-LD schemas |
| `client/src/data.js` | Single source of truth for products, categories, shop info, brands |
| `client/src/pages/ProductDetail.jsx` | Individual product page (route: `/products/:id`) |
| `client/src/pages/Category.jsx` | Category page (route: `/category/:slug`) |
| `client/src/pages/Products.jsx` | Product listing with category links and product detail links |
| `server/app.js` | Dynamic `sitemap.xml` generation including products + categories |
| `server/robots.txt` | Crawling rules (disallows `/admin/` and `/checkout`) |
| `scripts/seo-validate.js` | Validation script (run before deploy) |

---

## How SEO Is Generated (No Manual Per-Page Work)

1. **Title / Meta Description / Canonical**: `main.jsx` calls `getPageMeta(path)` from `seo.js`, which reads from static maps for fixed routes and auto-generates from `data.js` for dynamic product/category routes.
2. **H1**: Each page component renders its own `<h1>`. Product pages use the product name; category pages use the category title.
3. **Open Graph / Twitter Cards**: Auto-generated with absolute image URLs (`window.location.origin` + image path). Product pages use the product image; category pages use the category image.
4. **JSON-LD Schemas**:
   - **Organization** + **LocalBusiness**: Always present on every page (from `SHOP` in `data.js`).
   - **BreadcrumbList**: Auto-generated from route (Home → Category → Product for product pages).
   - **Product**: Auto-generated on `/products/:id` pages using actual product data (name, price, category, image, brand).
5. **Sitemap**: `server/app.js` reads `PRODUCTS` and `CATEGORIES` from `data.js` and appends `/products/:id` and `/category/:slug` URLs automatically.
6. **Noindex**: `/checkout` and `/admin/orders` are excluded from OG tags and marked `noindex, nofollow`.

---

## Adding a New Product

1. Open `client/src/data.js`.
2. Add a new entry to the `PRODUCTS` array with these required fields:
   - `id`: unique kebab-case string (e.g. `"sony-bravia-x90"`)
   - `name`: product display name
   - `category`: must match an existing category title (e.g. `"Smart TV"`)
   - `price`: number (INR)
   - `mrp`: number (INR)
   - `image`: path to `.webp` image (use `IMG` helper or full path)
   - `desc`: SEO-friendly description (≥ 30 chars, no keyword stuffing)
3. Save. The product page (`/products/:id`), sitemap entry, Product JSON-LD, OG image, and breadcrumb are all generated automatically.
4. Run validation: `node scripts/seo-validate.js`
5. Build: `npm run build --prefix client`

**Do NOT**: manually add entries to title/description maps in `main.jsx` or `seo.js` — they are auto-generated for products.

---

## Adding a New Category

1. Open `client/src/data.js`.
2. Add a new entry to the `CATEGORIES` array with:
   - `icon`: emoji
   - `title`: category display name
   - `text`: short tagline
   - `img`: image path
   - `desc`: SEO-friendly description (≥ 30 chars)
3. Save. The category page (`/category/:slug`), sitemap entry, and breadcrumb are generated automatically.
4. Run validation and build.

**Do NOT**: hardcode category pages in route maps — the `/category/:slug` route handles all categories dynamically.

---

## Adding a New Static Page (e.g. `/warranty`)

1. Create the page component in `client/src/pages/Warranty.jsx`.
2. Add the route in `client/src/App.jsx`:
   ```jsx
   <Route path="/warranty" element={<Warranty />} />
   ```
3. Add title and description to the `PAGE_TITLES` and `PAGE_DESCRIPTIONS` maps in `client/src/seo.js`.
4. Add canonical to `PAGE_CANONICAL` map.
5. Add breadcrumb to `PAGE_BREADCRUMBS` map (if applicable).
6. Add a link from `Footer.jsx` or `Navbar.jsx` to avoid orphan pages.
7. Add to sitemap static routes in `server/app.js`.
8. Run validation and build.

---

## Running SEO Validation

```bash
node scripts/seo-validate.js
```

Checks performed:
- All products have unique IDs, names, descriptions (≥ 30 chars), images, categories
- All categories have unique slugs, titles, descriptions (≥ 30 chars), images
- No duplicate page titles
- All `<Img>` components have `alt` text
- Organization, LocalBusiness, and Product JSON-LD schemas are valid
- No orphan public routes (every public route is linked from Nav/Footer/App)

Exit code 1 = errors found (fix before deploy). Exit code 0 = all clear.

---

## Deployment Checklist

Before every deploy:

- [ ] `node scripts/seo-validate.js` passes with exit code 0
- [ ] `npm run build --prefix client` passes
- [ ] New products use unique kebab-case `id`
- [ ] New product descriptions are ≥ 30 chars and not keyword-stuffed
- [ ] New categories have unique titles and descriptions
- [ ] All content images have meaningful `alt` text; decorative images have empty `alt`
- [ ] `robots.txt` still disallows `/admin/` and `/checkout`
- [ ] `sitemap.xml` includes new products/categories (check `/sitemap.xml` on staging)

---

## What Never to Do

- **Never** invent business details (address, phone, ratings, reviews). Use only `SHOP` from `data.js`.
- **Never** hardcode product counts (e.g. "100+ products") — use dynamic data.
- **Never** manually maintain per-product SEO in maps — use `data.js` + dynamic routes.
- **Never** keyword-stuff titles/descriptions. Keep them natural and under 60/160 chars.
- **Never** remove `noindex` from `/checkout` or `/admin/orders` — these are private.
- **Never** use relative OG image URLs — always absolute via `window.location.origin`.
