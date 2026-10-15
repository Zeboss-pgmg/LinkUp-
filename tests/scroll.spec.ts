import { test, expect, type Page } from "@playwright/test";

async function enter(page: Page) {
  await page.goto("/");
  await page.getByRole("button", { name: "Accéder à l’appli" }).click();
}

test("wheel changes one profile per burst and scrolls content pages normally", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await enter(page);
  const heading = page.locator(".card-content h2");
  await page.mouse.move(640, 400);
  await page.mouse.wheel(0, 100);
  await expect(heading).toHaveText("Photo au smartphone.");
  // Dispatch a single burst in one browser task: test-runner delays between
  // wheel calls could otherwise turn the tail into a genuinely new gesture.
  await page.waitForTimeout(550);
  await page.locator(".profile-card").evaluate(el => {
    for (let i = 0; i < 12; i++)
      el.dispatchEvent(new WheelEvent("wheel", { deltaY: 15, bubbles: true, cancelable: true }));
  });
  await expect(heading).toHaveText("Premiers pas en céramique.");
  await page.waitForTimeout(550);
  await page.mouse.wheel(0, -100);
  await expect(heading).toHaveText("Photo au smartphone.");
  await page.getByRole("button", { name: "Explorer", exact: true }).click();
  await page.mouse.move(640, 400);
  await page.mouse.wheel(0, 650);
  await expect.poll(() => page.locator("main").evaluate(e => e.scrollTop)).toBeGreaterThan(100);
  await page.getByRole("button", { name: "Profil", exact: true }).click();
  await expect.poll(() => page.locator("main").evaluate(e => e.scrollTop)).toBe(0);
  await page.mouse.move(640, 400);
  await page.mouse.wheel(0, 650);
  await expect.poll(() => page.locator("main").evaluate(e => e.scrollTop)).toBeGreaterThan(100);
  await page.getByRole("button", { name: "Mon calendrier" }).click();
  await page.getByRole("button", { name: "Fermer", exact: true }).click();
  const beforeWheel = await page.locator("main").evaluate(e => e.scrollTop);
  await page.mouse.move(640, 400);
  await page.mouse.wheel(0, 200);
  await expect.poll(() => page.locator("main").evaluate(e => e.scrollTop)).toBeGreaterThan(beforeWheel);
});

test("touch scroll crosses category buttons without selecting them; upward card swipe advances", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  await enter(page);
  const client = await context.newCDPSession(page);
  async function swipe(x: number, from: number, to: number) {
    await client.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y: from }] });
    for (let i = 1; i <= 10; i++) {
      await client.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y: from + (to - from) * i / 10 }] });
      await page.waitForTimeout(16);
    }
    await client.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  }
  await swipe(180, 470, 270);
  await expect(page.locator(".card-content h2")).toHaveText("Photo au smartphone.");
  await page.getByRole("button", { name: "Explorer", exact: true }).click();
  await page.waitForTimeout(300);
  await swipe(100, 620, 240);
  await expect.poll(() => page.locator("main").evaluate(e => e.scrollTop)).toBeGreaterThan(100);
  await expect(page.locator(".category-tile[aria-pressed=true]")).toHaveCount(0);
  await page.getByRole("button", { name: "Profil", exact: true }).click();
  await swipe(170, 620, 230);
  await expect.poll(() => page.locator("main").evaluate(e => e.scrollTop)).toBeGreaterThan(100);
  await page.setViewportSize({ width: 320, height: 568 });
  await page.getByRole("button", { name: "Découverte", exact: true }).click();
  await page.locator(".profile-card").focus();
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(650);
  await swipe(150, 340, 220);
  await expect.poll(() => page.locator(".card-back").evaluate(e => e.scrollTop)).toBeGreaterThan(0);
  await expect(page.locator(".card-content h2")).toHaveText("Photo au smartphone.");
  await context.close();
});
