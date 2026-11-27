// @ts-check
const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  page.on("pageerror", (err) => { throw err; });
});

test("home loads in Chinese by default with the 000 banner", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await expect(page.locator("#brand")).toHaveText("澳洲留学生防骗指南");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("先别慌");
  await expect(page.locator(".danger-banner a[href='tel:000']")).toBeVisible();
  await expect(page.locator(".grid .card")).toHaveCount(8);
});

test("language toggle switches to English and is remembered", async ({ page }) => {
  await page.goto("/");
  await page.locator("#lang-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en-AU");
  await expect(page.locator("#brand")).toHaveText("ScamGuard AU");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Check here first");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en-AU");
  await page.locator("#lang-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
});

test("?lang=en query forces English", async ({ page }) => {
  await page.goto("/?lang=en#/help");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Get help and report");
});

test("every scam page renders all four sections", async ({ page }) => {
  await page.goto("/#/scams");
  const hrefs = await page.locator(".grid a").evaluateAll((as) => as.map((a) => a.getAttribute("href")));
  expect(hrefs).toHaveLength(8);
  for (const href of hrefs) {
    await page.goto("/" + href);
    await expect(page.locator(".scam h2")).toHaveCount(4);
    await expect(page.locator(".scam .contact").first()).toBeVisible();
  }
});

test("self-check: being told to isolate leads to call 000", async ({ page }) => {
  await page.goto("/?lang=en#/check");
  await page.getByRole("link", { name: /leave home, cut contact/ }).click();
  await expect(page.locator(".result-urgent h2")).toContainText("Call 000");
  await expect(page.locator(".result-urgent + h2 + .contacts a[href='tel:000']")).toBeVisible();
});

test("self-check: authority call with no loss, back and restart work", async ({ page }) => {
  await page.goto("/?lang=en#/check");
  await page.getByRole("link", { name: /claiming to be police/ }).click();
  await expect(page.getByRole("heading", { level: 2 })).toHaveText("Have you sent money or given personal details?");
  await page.getByRole("link", { name: "Not yet" }).click();
  await expect(page.locator(".result-ok h2")).toContainText("Hang up");
  await page.getByRole("link", { name: "Back", exact: true }).click();
  await expect(page).toHaveURL(/#\/check\/authority$/);
  await page.goto("/?lang=en#/check/authority/authorityNoLoss");
  await page.getByRole("link", { name: "Start over" }).click();
  await expect(page).toHaveURL(/#\/check$/);
});

test("help page lists tel: links that match the shown numbers", async ({ page }) => {
  await page.goto("/#/help");
  const calls = page.locator("a.btn-call");
  expect(await calls.count()).toBeGreaterThanOrEqual(5);
  for (const a of await calls.all()) {
    const href = await a.getAttribute("href");
    const shown = (await a.locator(".num").innerText()).replace(/\s+/g, "");
    expect(href).toBe("tel:" + shown);
  }
  for (const a of await page.locator("a.btn-link").all()) {
    expect(await a.getAttribute("href")).toMatch(/^https:\/\//);
    expect(await a.getAttribute("rel")).toContain("noopener");
  }
});

test("skip link moves focus to main without breaking the route", async ({ page, browserName, isMobile }) => {
  test.skip(isMobile, "keyboard only");
  await page.goto("/#/help");
  await page.keyboard.press("Tab");
  await expect(page.locator("#skip")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
  await expect(page).toHaveURL(/#\/help$/);
});

test("unknown route shows not found", async ({ page }) => {
  await page.goto("/#/nope");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("找不到这个页面。");
});

test("no horizontal scroll at phone width", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  for (const route of ["#/", "#/scams/virtual-kidnapping", "#/check", "#/help"]) {
    await page.goto("/" + route);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, route).toBeLessThanOrEqual(0);
  }
});

test("phone layout: bottom tab bar is visible and nav links work", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/?lang=en");
  const nav = page.getByRole("navigation");
  const box = await nav.boundingBox();
  expect(box.y + box.height).toBeGreaterThan(800);
  await nav.getByRole("link", { name: "Help" }).click();
  await expect(page).toHaveURL(/#\/help$/);
  await expect(nav.getByRole("link", { name: "Help" })).toHaveAttribute("aria-current", "page");
});

test("desktop layout: nav sits in the header", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop only");
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  const box = await page.getByRole("navigation").boundingBox();
  expect(box.y).toBeLessThan(150);
});
