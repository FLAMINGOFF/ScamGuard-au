// @ts-check
// Accessibility checks with axe-core (WCAG 2.0/2.1/2.2 A and AA) on every page, in both languages and both colour schemes.
const { test, expect } = require("@playwright/test");
const { AxeBuilder } = require("@axe-core/playwright");

const routes = ["#/", "#/scams", "#/scams/fake-police", "#/scams/virtual-kidnapping", "#/check", "#/check/danger", "#/check/authority", "#/help"];

for (const lang of ["zh", "en"]) {
  for (const scheme of ["light", "dark"]) {
    test.describe(`${lang} ${scheme}`, () => {
      test.use({ colorScheme: scheme });
      for (const route of routes) {
        test(`no axe violations on ${route}`, async ({ page }) => {
          await page.goto(`/?lang=${lang}${route}`);
          await expect(page.locator("#main h1")).toBeVisible();
          const results = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
            .analyze();
          const summary = results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
          expect(summary, summary.join("\n")).toEqual([]);
        });
      }
    });
  }
}
