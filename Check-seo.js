// check-seo.js
// Run against your local preview server: node check-seo.js
//
// Visits every route from SEO_CONFIG in a real (headless) browser,
// waits for React to render, then reports exactly what's in <head> —
// the same thing a rendering-capable crawler (like modern Googlebot) would see.

import puppeteer from "puppeteer";

// Point this at whatever your `npm run preview` prints
const BASE_URL = "http://localhost:5173";

// Keep this in sync with src/seoConfig.js — or import it directly if your
// module setup allows (see note at the bottom of this file).
const ROUTES = [
  "/",
  "/about",
  "/events",
  "/digital",
  "/exhibition",
  "/activation",
  "/presence",
  "/casestudies",
  "/awards",
  "/profile",
  "/terms",
  "/dataprivacy",
  "/privacypolicy",
];

async function checkRoute(page, path) {
  const url = `${BASE_URL}${path}`;
  await page.goto(url, { waitUntil: "networkidle0" });

  // Small extra wait in case Helmet updates head slightly after networkidle
  await new Promise((r) => setTimeout(r, 200));

  const result = await page.evaluate(() => {
    return {
      title: document.title || null,
      canonical: document.querySelector('link[rel="canonical"]')?.href || null,
      description:
        document.querySelector('meta[name="description"]')?.content || null,
      robots: document.querySelector('meta[name="robots"]')?.content || null,
    };
  });

  return { path, ...result };
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log(`Checking ${ROUTES.length} routes against ${BASE_URL}\n`);
  console.log(
    "PATH".padEnd(16) +
      "CANONICAL".padEnd(46) +
      "ROBOTS".padEnd(18) +
      "TITLE"
  );
  console.log("-".repeat(120));

  const results = [];
  for (const path of ROUTES) {
    const r = await checkRoute(page, path);
    results.push(r);

    const canonicalStr = r.canonical || "❌ MISSING";
    const robotsStr = r.robots || "(none set)";
    const titleStr = r.title || "❌ MISSING";

    console.log(
      path.padEnd(16) + canonicalStr.padEnd(46) + robotsStr.padEnd(18) + titleStr
    );
  }

  console.log("\n--- Flags ---");
  let issues = 0;
  for (const r of results) {
    // A route should have EITHER a canonical OR noindex robots, never both, never neither
    const hasCanonical = !!r.canonical;
    const hasNoindex = r.robots?.includes("noindex");

    if (!hasCanonical && !hasNoindex) {
      console.log(`⚠️  ${r.path} — no canonical AND no noindex (likely missing SEO_CONFIG entry)`);
      issues++;
    }
    if (hasCanonical && hasNoindex) {
      console.log(`⚠️  ${r.path} — has BOTH canonical and noindex (check Seo.jsx logic)`);
      issues++;
    }
    if (hasCanonical && !r.canonical.endsWith(r.path === "/" ? "/" : r.path)) {
      console.log(`⚠️  ${r.path} — canonical (${r.canonical}) doesn't match this route's own path`);
      issues++;
    }
    if (!r.description && !hasNoindex) {
      console.log(`⚠️  ${r.path} — missing meta description`);
      issues++;
    }
  }

  if (issues === 0) {
    console.log("✅ No issues found — every route has a correct, self-referencing canonical (or intentional noindex).");
  }

  await browser.close();
})();