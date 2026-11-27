// Turns the Lighthouse CI results into shields.io "endpoint" badge files.
// Usage: node scripts/lighthouse-badges.js <lhci output dir> <badge output dir>
const fs = require("node:fs");
const path = require("node:path");

const [inDir = ".lighthouseci", outDir = "_site/badges"] = process.argv.slice(2);
const manifest = JSON.parse(fs.readFileSync(path.join(inDir, "manifest.json"), "utf8"));
const runs = manifest.filter((r) => r.isRepresentativeRun);
if (!runs.length) throw new Error("No Lighthouse runs found");

const labels = { performance: "performance", accessibility: "accessibility", "best-practices": "best practices", seo: "SEO" };
fs.mkdirSync(outDir, { recursive: true });

const color = (s) => (s >= 90 ? "brightgreen" : s >= 50 ? "orange" : "red");
const all = [];
for (const [key, label] of Object.entries(labels)) {
  // Report the worst page so the badge never overstates the score.
  const score = Math.round(Math.min(...runs.map((r) => r.summary[key])) * 100);
  all.push(score);
  const badge = { schemaVersion: 1, label: `lighthouse ${label}`, message: String(score), color: color(score) };
  fs.writeFileSync(path.join(outDir, `${key}.json`), JSON.stringify(badge));
  console.log(`${label}: ${score}`);
}
const summary = { schemaVersion: 1, label: "lighthouse", message: all.join(" | "), color: color(Math.min(...all)) };
fs.writeFileSync(path.join(outDir, "lighthouse.json"), JSON.stringify(summary));
