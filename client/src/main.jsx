import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import {
  getPageMeta,
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateProductSchema,
  generateBreadcrumbSchema,
  ogImageForPath,
  findProduct,
  findCategory,
  BASE_URL,
  absolute,
  PAGE_BREADCRUMBS,
} from "./seo.js";

const ORGANIZATION_SCHEMA = generateOrganizationSchema();
const LOCAL_BUSINESS_SCHEMA = generateLocalBusinessSchema();

function setMetaTag(selector, attr, attrValue, createAttr = "name") {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(createAttr, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", attrValue);
  return el;
}

function setOgTag(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setTwitterTag(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setJsonLd(id, data) {
  let script = document.getElementById(id);
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

function removeJsonLd(id) {
  const script = document.getElementById(id);
  if (script) script.remove();
}

function SeoSetter() {
  const location = useLocation();

  React.useEffect(() => {
    const rawPath = location.pathname;
    const meta = getPageMeta(rawPath);

    // ---- Title ----
    document.title = meta.title;

    // ---- Meta description ----
    setMetaTag('meta[name="description"]', "name", "description", "name");

    // ---- Meta robots: noindex for private routes ----
    let robots = document.querySelector('meta[name="robots"]');
    if (meta.noindex) {
      if (!robots) {
        robots = document.createElement("meta");
        robots.name = "robots";
        document.head.appendChild(robots);
      }
      robots.setAttribute("content", "noindex, nofollow");
    } else if (robots) {
      robots.remove();
    }

    // ---- Canonical: exactly one self-referencing tag ----
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = absolute(meta.canonical);

    // ---- Open Graph + Twitter Card (skip for private routes) ----
    if (!meta.noindex) {
      const ogImage = ogImageForPath(rawPath);
      const ogTags = {
        "og:title": meta.title,
        "og:description": meta.desc,
        "og:type": "website",
        "og:url": absolute(meta.canonical),
        "og:image": absolute(ogImage),
        "og:image:type": "image/webp",
        "og:image:width": "1200",
        "og:image:height": "630",
        "og:image:alt": `${meta.title} – ${ORGANIZATION_SCHEMA.name}`,
      };
      Object.entries(ogTags).forEach(([property, content]) => setOgTag(property, content));
      // Remove stale og tags
      document.querySelectorAll('meta[property^="og:"]').forEach((el) => {
        const prop = el.getAttribute("property");
        if (!ogTags.hasOwnProperty(prop)) el.remove();
      });

      const twitterTags = {
        "twitter:card": "summary_large_image",
        "twitter:title": meta.title,
        "twitter:description": meta.desc,
        "twitter:image": absolute(ogImage),
      };
      Object.entries(twitterTags).forEach(([name, content]) => setTwitterTag(name, content));
      document.querySelectorAll('meta[name^="twitter:"]').forEach((el) => {
        const name = el.getAttribute("name");
        if (!twitterTags.hasOwnProperty(name)) el.remove();
      });
    }

    // ---- Organization + LocalBusiness schema (always present) ----
    setJsonLd("organization-schema", ORGANIZATION_SCHEMA);
    setJsonLd("local-business-schema", LOCAL_BUSINESS_SCHEMA);

    // ---- Product schema for product pages ----
    const productMatch = meta.canonical.match(/^\/products\/([a-z0-9-]+)$/);
    if (productMatch) {
      const product = findProduct(productMatch[1]);
      if (product) {
        setJsonLd("product-schema", generateProductSchema(product));
      } else {
        removeJsonLd("product-schema");
      }
    } else {
      removeJsonLd("product-schema");
    }

    // ---- BreadcrumbList schema ----
    const normalized = rawPath;
    let bc = null;

    const productBreadcrumbMatch = normalized.match(/^\/products\/([a-z0-9-]+)$/);
    if (productBreadcrumbMatch) {
      const product = findProduct(productBreadcrumbMatch[1]);
      if (product) {
        bc = [
          { name: "Home", url: "/" },
          { name: product.category, url: "/products" },
          { name: product.name, url: `/products/${product.id}` },
        ];
      }
    } else {
      const categoryBreadcrumbMatch = normalized.match(/^\/category\/([a-z0-9-]+)$/);
      if (categoryBreadcrumbMatch) {
        const category = findCategory(categoryBreadcrumbMatch[1]);
        if (category) {
          bc = [
            { name: "Home", url: "/" },
            { name: "Products", url: "/products" },
            { name: category.title, url: `/category/${categoryBreadcrumbMatch[1]}` },
          ];
        }
      }
    }

    if (!bc) {
      bc = PAGE_BREADCRUMBS[normalized] || null;
    }

    if (bc) {
      setJsonLd("breadcrumb-schema", generateBreadcrumbSchema(bc));
    } else {
      removeJsonLd("breadcrumb-schema");
    }
  }, [location.pathname, location.search, location.hash]);

  return null;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SeoSetter />
    <App />
  </BrowserRouter>
);
