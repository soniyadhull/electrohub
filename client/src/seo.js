// SEO utility module for ElectroHub.
// All metadata, structured data and validation is data-driven from data.js
// so adding new products, categories or pages requires no manual SEO edits.

import { SHOP, PRODUCTS, CATEGORIES, BRANDS } from "./data.js";

const SITE_NAME = "ElectroHub";
export const BASE_URL = (() => {
  if (typeof window !== "undefined" && window.location.origin) {
    return window.location.origin;
  }
  return process.env.SITE_URL || "https://electrohub-wine.vercel.app";
})();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export const slugify = (text) =>
  String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const findProduct = (id) => PRODUCTS.find((p) => p.id === id);
export const findCategory = (slug) =>
  CATEGORIES.find((c) => slugify(c.title) === slug);

export const normalizePath = (rawPath) => {
  try {
    const url = new URL(rawPath, BASE_URL);
    let path = url.pathname;
    if (path.length > 1) path = path.replace(/\/+$/, "");
    if (path === "") path = "/";
    return path;
  } catch {
    return rawPath;
  }
};

export const absolute = (path) => `${BASE_URL}${path}`;

// ---------------------------------------------------------------------------
// Metadata generators
// ---------------------------------------------------------------------------

export const PAGE_TITLES = {
  "/": "ElectroHub – Buy Electronics Online at Best Prices",
  "/about": "ElectroHub | About Electronics Shop in Narwana, Jind",
  "/gallery": "ElectroHub | Photo Gallery – Products & Shop in Narwana",
  "/products": "ElectroHub | Products & Prices – Mobiles, Smart TV, Laptop Narwana",
  "/contact": "ElectroHub | Contact Us – Narwana, Jind, Haryana",
  "/checkout": "ElectroHub | Checkout – Secure COD Order",
  "/track-order": "ElectroHub | Track Your Order – Narwana",
  "/admin/orders": "ElectroHub | Order Management – Staff Admin",
  "/privacy": "ElectroHub | Privacy Policy – Narwana, Jind",
  "/terms": "ElectroHub | Terms & Conditions – Narwana, Jind",
};

export const PAGE_DESCRIPTIONS = {
  "/": "Buy original mobiles, smart TVs, laptops & accessories at ElectroHub Narwana. Best prices, brand warranty, no-cost EMI, home delivery.",
  "/about": "ElectroHub in Narwana, Jind: trusted electronics shop since 2016. Original products, brand warranty, repair, exchange and no-cost EMI.",
  "/gallery": "Explore ElectroHub photo gallery – products, store ambience and customer moments at Narwana, Jind.",
  "/products": "Compare Samsung mobile, smart TV, laptop & audio prices at ElectroHub Narwana. Online references, brand warranty, confirm in-store or WhatsApp.",
  "/contact": "Contact ElectroHub Narwana, Jind, Haryana. Call, WhatsApp or visit for price, stock, repair and EMI enquiries.",
  "/checkout": "Complete your ElectroHub order safely. Cash on delivery, Haryana delivery, 3–7 business days. Track your order instantly.",
  "/track-order": "Track your ElectroHub order in Narwana. Enter the tracking ID to see live status, delivery estimate and payment details.",
  "/admin/orders": "ElectroHub order management dashboard for staff. Update order status and verify payments securely.",
  "/privacy": "ElectroHub privacy policy: how we collect, use and protect your personal data when you enquire or order with us.",
  "/terms": "ElectroHub terms & conditions: prices, warranty, delivery, returns and exchange policy for Narwana, Jind, Haryana.",
};

export const PAGE_CANONICAL = {
  "/": "/",
  "/about": "/about",
  "/gallery": "/gallery",
  "/products": "/products",
  "/contact": "/contact",
  "/track-order": "/track-order",
  "/privacy": "/privacy",
  "/terms": "/terms",
};

export const NOINDEX_PATHS = new Set(["/checkout", "/admin/orders"]);

export const PAGE_OG_IMAGES = {
  "/": "/images/og-image.webp",
  "/about": "/images/store.webp",
  "/gallery": "/images/hero.webp",
  "/products": "/images/phone.webp",
  "/contact": "/images/store.webp",
  "/track-order": "/images/og-image.webp",
  "/privacy": "/images/og-image.webp",
  "/terms": "/images/og-image.webp",
};

export const PAGE_BREADCRUMBS = {
  "/": null,
  "/about": [{ name: "Home", url: "/" }, { name: "About Us", url: "/about" }],
  "/gallery": [{ name: "Home", url: "/" }, { name: "Gallery", url: "/gallery" }],
  "/products": [{ name: "Home", url: "/" }, { name: "Products", url: "/products" }],
  "/contact": [{ name: "Home", url: "/" }, { name: "Contact Us", url: "/contact" }],
  "/track-order": [{ name: "Home", url: "/" }, { name: "Track Order", url: "/track-order" }],
  "/privacy": [{ name: "Home", url: "/" }, { name: "Privacy Policy", url: "/privacy" }],
  "/terms": [{ name: "Home", url: "/" }, { name: "Terms & Conditions", url: "/terms" }],
};

// Route category pages to /products breadcrumb (no dedicated category page by default)
export const getPageMeta = (path) => {
  const normalized = normalizePath(path);
  let title = PAGE_TITLES[normalized];
  let desc = PAGE_DESCRIPTIONS[normalized];
  let canonical = PAGE_CANONICAL[normalized];
  let noindex = NOINDEX_PATHS.has(normalized);

  // Dynamic product route: /products/:id
  const productMatch = normalized.match(/^\/products\/([a-z0-9-]+)$/);
  if (productMatch) {
    const product = findProduct(productMatch[1]);
    if (product) {
      title = `${product.name} – Best Price in Narwana | ElectroHub`;
      desc = product.desc || `${product.name} (${product.category}) – original product with brand warranty at ElectroHub Narwana. Check price and stock.`;
      canonical = `/products/${product.id}`;
      noindex = false;
    } else {
      title = PAGE_TITLES["/products"];
      desc = PAGE_DESCRIPTIONS["/products"];
      canonical = "/products";
    }
  }

  // Dynamic category route: /category/:slug
  const categoryMatch = normalized.match(/^\/category\/([a-z0-9-]+)$/);
  if (categoryMatch) {
    const category = findCategory(categoryMatch[1]);
    if (category) {
      title = `${category.title} – Best Prices in Narwana | ElectroHub`;
      desc = category.desc || `Browse ${category.title} at ElectroHub Narwana. Original products, brand warranty, GST bill and no-cost EMI.`;
      canonical = `/category/${slugify(category.title)}`;
      noindex = false;
    } else {
      title = PAGE_TITLES["/products"];
      desc = PAGE_DESCRIPTIONS["/products"];
      canonical = "/products";
    }
  }

  if (!title) {
    title = PAGE_TITLES["/"];
    desc = PAGE_DESCRIPTIONS["/"];
    canonical = PAGE_CANONICAL["/"];
  }

  return { title, desc, canonical, noindex };
};

// ---------------------------------------------------------------------------
// Structured Data (JSON-LD)
// ---------------------------------------------------------------------------

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SHOP.name,
  url: BASE_URL,
  logo: `${BASE_URL}/images/favicon.svg`,
  telephone: SHOP.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: SHOP.address,
    addressLocality: "Narwana",
    addressRegion: "Jind",
    addressCountry: "IN",
    postalCode: "",
  },
  sameAs: [],
});

export const generateLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE_URL}/#localbusiness`,
  name: SHOP.name,
  image: `${BASE_URL}/images/store.webp`,
  telephone: SHOP.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: SHOP.address,
    addressLocality: "Narwana",
    addressRegion: "Jind",
    addressCountry: "IN",
  },
  priceRange: "₹",
  servesCircularly: "Haryana",
});

export const generateProductSchema = (product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  image: product.image,
  description: product.desc,
  brand: {
    "@type": "Brand",
    name: product.category === "Audio" ? "Samsung" : product.name.split(" ")[0],
  },
  offers: {
    "@type": "Offer",
    url: `${BASE_URL}/products/${product.id}`,
    priceCurrency: "INR",
    price: String(product.price),
    priceValidUntil: undefined,
    itemCondition: "https://schema.org/NewCondition",
    availability: "https://schema.org/InStock",
  },
  category: product.category,
});

export const generateBreadcrumbSchema = (items) => {
  if (!items || items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absolute(item.url),
    })),
  };
};

// ---------------------------------------------------------------------------
// Open Graph / Twitter helpers
// ---------------------------------------------------------------------------

export const ogImageForPath = (path) => {
  const normalized = normalizePath(path);
  const productMatch = normalized.match(/^\/products\/([a-z0-9-]+)$/);
  if (productMatch) {
    const product = findProduct(productMatch[1]);
    if (product && product.image) return product.image;
  }
  const categoryMatch = normalized.match(/^\/category\/([a-z0-9-]+)$/);
  if (categoryMatch) {
    const category = findCategory(categoryMatch[1]);
    if (category && category.img) return category.img;
  }
  return PAGE_OG_IMAGES[normalized] || PAGE_OG_IMAGES["/"];
};

// ---------------------------------------------------------------------------
// SEO Validation
// ---------------------------------------------------------------------------

// Validate a single page's rendered head for common SEO issues.
// Returns { errors: string[], warnings: string[] }.
export const validatePageSEO = ({ title, description, h1Count, altTexts, schemaJson, canonical }) => {
  const errors = [];
  const warnings = [];

  if (!title || title.trim().length === 0) errors.push("Missing <title>");
  else if (title.length > 60) warnings.push(`Title too long (${title.length} chars, recommended ≤ 60)`);
  else if (title.length < 15) warnings.push(`Title too short (${title.length} chars)`);

  if (!description || description.trim().length === 0) errors.push("Missing meta description");
  else if (description.length > 160) warnings.push(`Meta description too long (${description.length} chars, recommended ≤ 160)`);

  if (h1Count === 0) errors.push("Missing <h1>");
  else if (h1Count > 1) warnings.push(`Multiple <h1> tags found (${h1Count})`);

  const missingAlt = altTexts.filter((a) => a == null || a.trim() === "");
  if (missingAlt.length > 0) errors.push(`${missingAlt.length} content image(s) missing alt text`);

  if (!canonical) errors.push("Missing canonical URL");

  try {
    if (schemaJson) JSON.parse(schemaJson);
  } catch {
    errors.push("Invalid JSON-LD schema");
  }

  return { errors, warnings };
};

// Validate the full product catalog for SEO completeness.
export const validateProducts = () => {
  const issues = [];
  PRODUCTS.forEach((p) => {
    if (!p.id) issues.push(`Product missing id: ${p.name}`);
    if (!p.desc || p.desc.length < 30) issues.push(`Product "${p.name}" has short or missing description`);
    if (!p.image) issues.push(`Product "${p.name}" missing image`);
    const brand = p.name.split(" ")[0];
    if (!BRANDS.includes(brand)) {
      issues.push(`Product "${p.name}" brand "${brand}" not in BRANDS list`);
    }
  });
  return issues;
};

// Validate categories for SEO completeness.
export const validateCategories = () => {
  const issues = [];
  CATEGORIES.forEach((c) => {
    if (!c.desc || c.desc.length < 30) issues.push(`Category "${c.title}" has short or missing description`);
    if (!c.img) issues.push(`Category "${c.title}" missing image`);
  });
  return issues;
};
