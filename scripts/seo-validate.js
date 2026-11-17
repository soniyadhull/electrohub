// SEO validation script for ElectroHub.
// Run: node scripts/seo-validate.js
// Checks: missing metadata, duplicate titles, missing ALT text, invalid schema, orphan pages.

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CLIENT_SRC = path.join(ROOT, "client", "src");
const ERRORS = [];
const WARNINGS = [];

// ---------------------------------------------------------------------------
// Load data.js by reading and evaluating (simple regex-based extraction)
// ---------------------------------------------------------------------------

function readFile(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

// Extract PRODUCTS array from data.js using a lightweight approach
// (we import the module directly since it's ESM-compatible-ish)
let PRODUCTS = [];
let CATEGORIES = [];
let SHOP = {};
let BRANDS = [];

try {
  // data.js uses export const, so we can dynamically import it
  const dataMod = await import(path.join(CLIENT_SRC, "data.js").replace(/\\/g, "/"));
  PRODUCTS = dataMod.PRODUCTS || [];
  CATEGORIES = dataMod.CATEGORIES || [];
  SHOP = dataMod.SHOP || {};
  BRANDS = dataMod.BRANDS || [];
} catch (err) {
  ERRORS.push(`Cannot load data.js: ${err.message}`);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const slugify = (text) => String(text).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");

// ---------------------------------------------------------------------------
// 1. Product validation
// ---------------------------------------------------------------------------

console.log("=== Product SEO Validation ===\n");

const seenProductIds = new Set();
PRODUCTS.forEach((p, i) => {
  const label = `Product #${i + 1} (${p.name || "unnamed"})`;

  if (!p.id) {
    ERRORS.push(`${label}: missing id`);
  } else if (seenProductIds.has(p.id)) {
    ERRORS.push(`${label}: duplicate id "${p.id}"`);
  } else {
    seenProductIds.add(p.id);
  }

  if (!p.name) ERRORS.push(`${label}: missing name`);
  if (!p.desc || p.desc.length < 30) {
    WARNINGS.push(`${label}: description too short (${p.desc ? p.desc.length : 0} chars, recommended ≥ 30)`);
  }
  if (!p.image) ERRORS.push(`${label}: missing image`);
  else if (!p.image.includes(".webp") && !p.image.includes(".svg")) {
    WARNINGS.push(`${label}: image may not be optimized format: ${p.image}`);
  }
  if (!p.category) ERRORS.push(`${label}: missing category`);
});

console.log(`Products checked: ${PRODUCTS.length}`);
console.log(`Errors: ${ERRORS.filter(e => e.startsWith("Product")).length}`);
console.log(`Warnings: ${WARNINGS.filter(w => w.startsWith("Product")).length}\n`);

// ---------------------------------------------------------------------------
// 2. Category validation
// ---------------------------------------------------------------------------

console.log("=== Category SEO Validation ===\n");

const seenCategorySlugs = new Set();
CATEGORIES.forEach((c, i) => {
  const label = `Category #${i + 1} (${c.title || "unnamed"})`;
  const slug = slugify(c.title || "");

  if (!c.title) ERRORS.push(`${label}: missing title`);
  else if (seenCategorySlugs.has(slug)) {
    ERRORS.push(`${label}: duplicate slug "${slug}"`);
  } else {
    seenCategorySlugs.add(slug);
  }

  if (!c.desc || c.desc.length < 30) {
    WARNINGS.push(`${label}: description too short (${c.desc ? c.desc.length : 0} chars, recommended ≥ 30)`);
  }
  if (!c.img) ERRORS.push(`${label}: missing image`);
});

console.log(`Categories checked: ${CATEGORIES.length}`);
console.log(`Errors: ${ERRORS.filter(e => e.startsWith("Category")).length}`);
console.log(`Warnings: ${WARNINGS.filter(w => w.startsWith("Category")).length}\n`);

// ---------------------------------------------------------------------------
// 3. Duplicate titles check (from main.jsx / seo.js)
// ---------------------------------------------------------------------------

console.log("=== Title Uniqueness Validation ===\n");

const mainContent = readFile("client/src/main.jsx");
const titleMatches = mainContent.match(/"([^"]+)":\s*"([^"]+)"/g) || [];
const titles = [];
titleMatches.forEach((m) => {
  const kv = m.match(/"([^"]+)":\s*"([^"]+)"/);
  if (kv) titles.push({ key: kv[1], value: kv[2] });
});

const seenTitles = new Set();
titles.forEach((t) => {
  if (seenTitles.has(t.value)) {
    ERRORS.push(`Duplicate title: "${t.value}" (key: ${t.key})`);
  }
  seenTitles.add(t.value);
});

console.log(`Title entries checked: ${titles.length}`);
console.log(`Duplicate titles: ${ERRORS.filter(e => e.startsWith("Duplicate title")).length}\n`);

// ---------------------------------------------------------------------------
// 4. Image ALT text check (Img.jsx usage)
// ---------------------------------------------------------------------------

console.log("=== Image ALT Text Validation ===\n");

// Scan all JSX files for Img usage and check for missing alt
const jsxFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".jsx")) jsxFiles.push(full);
  }
}
walk(CLIENT_SRC);

let imgMissingAlt = 0;
let imgTotal = 0;
jsxFiles.forEach((file) => {
  const content = readFile(path.relative(ROOT, file));
  const imgUsages = content.match(/<Img[^>]*>/g) || [];
  imgUsages.forEach((usage) => {
    imgTotal++;
    const hasAlt = /alt\s*=/i.test(usage);
    if (!hasAlt) {
      const relFile = path.relative(ROOT, file);
      ERRORS.push(`Img without alt in ${relFile}: ${usage.slice(0, 80)}...`);
      imgMissingAlt++;
    }
  });
});

console.log(`Img components checked: ${imgTotal}`);
console.log(`Missing alt: ${imgMissingAlt}\n`);

// ---------------------------------------------------------------------------
// 5. JSON-LD schema validation
// ---------------------------------------------------------------------------

console.log("=== JSON-LD Schema Validation ===\n");

try {
  const seoMod = await import(path.join(CLIENT_SRC, "seo.js").replace(/\\/g, "/"));
  const org = seoMod.generateOrganizationSchema();
  const lb = seoMod.generateLocalBusinessSchema();
  JSON.stringify(org);
  JSON.stringify(lb);
  console.log("Organization schema: valid");
  console.log("LocalBusiness schema: valid");

  // Validate product schema for each product
  let invalidProductSchemas = 0;
  PRODUCTS.forEach((p) => {
    try {
      const ps = seoMod.generateProductSchema(p);
      JSON.stringify(ps);
      if (!ps.offers || !ps.offers.price || !ps.name) {
        WARNINGS.push(`Product schema incomplete for "${p.name}"`);
        invalidProductSchemas++;
      }
    } catch {
      ERRORS.push(`Invalid Product schema for "${p.name}"`);
      invalidProductSchemas++;
    }
  });
  console.log(`Product schemas checked: ${PRODUCTS.length}, invalid: ${invalidProductSchemas}`);
} catch (err) {
  ERRORS.push(`SEO module import failed: ${err.message}`);
}
console.log("");

// ---------------------------------------------------------------------------
// 6. Orphan page check
// ---------------------------------------------------------------------------

console.log("=== Orphan Page Validation ===\n");

const publicRoutes = [
  "/",
  "/about",
  "/gallery",
  "/products",
  "/contact",
  "/track-order",
  "/privacy",
  "/terms",
];
const privateRoutes = new Set(["/checkout", "/admin/orders"]);

// Check footer links (Navbar + Footer reference all public routes)
const appContent = readFile("client/src/App.jsx");
const footerContent = readFile("client/src/components/Footer.jsx");
const navbarContent = readFile("client/src/components/Navbar.jsx");

let orphanWarnings = 0;
publicRoutes.forEach((route) => {
  const referenced = appContent.includes(route) || footerContent.includes(route) || navbarContent.includes(route);
  if (!referenced && !privateRoutes.has(route)) {
    WARNINGS.push(`Route "${route}" may be orphaned (not linked from Nav/Footer/App)`);
    orphanWarnings++;
  }
});

console.log(`Public routes checked: ${publicRoutes.length}`);
console.log(`Potential orphans: ${orphanWarnings}\n`);

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------

console.log("=== SUMMARY ===\n");
console.log(`Total errors: ${ERRORS.length}`);
console.log(`Total warnings: ${WARNINGS.length}`);

if (ERRORS.length > 0) {
  console.log("\n--- ERRORS ---");
  ERRORS.forEach((e) => console.log(`  [ERROR] ${e}`));
}
if (WARNINGS.length > 0) {
  console.log("\n--- WARNINGS ---");
  WARNINGS.forEach((w) => console.log(`  [WARN]  ${w}`));
}

process.exit(ERRORS.length > 0 ? 1 : 0);
