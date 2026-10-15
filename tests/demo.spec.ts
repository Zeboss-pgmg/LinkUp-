import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  const enter = page.getByRole("button", { name: "Accéder à l’appli" });
  if (await enter.isVisible()) await enter.click();
});
test("discovery gestures, interest, conversation and reservation lifecycle", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Nail art & manucure." }),
  ).toBeVisible();
  const card = page.getByRole("group");
  const box = (await card.boundingBox())!;
  await page.mouse.move(box.x + 60, box.y + 170);
  await page.mouse.down();
  await page.mouse.move(box.x + 170, box.y + 110, { steps: 8 });
  await page.mouse.up();
  await expect(page.locator(".card-back h2")).toHaveText("Léa");
  await card.focus();
  await page.keyboard.press("ArrowLeft");
  await page.getByRole("button", { name: "Ça m’intéresse" }).click();
  await expect(
    page.getByRole("button", { name: "Intérêt envoyé" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Écrire à Léa" }).click();
  await page
    .getByRole("textbox", { name: "Ton message" })
    .fill("Salut, je voudrais découvrir le nail art !");
  await page.getByRole("button", { name: "Envoyer le message" }).click();
  await expect(
    page.getByText("Salut, je voudrais découvrir le nail art !").last(),
  ).toBeVisible();
  await page.getByRole("button", { name: "Planifier un échange" }).click();
  await page.getByRole("button", { name: "1 point(s) fictif(s)" }).click();
  await page
    .getByRole("button", { name: "Confirmer la réservation fictive" })
    .click();
  await page.getByRole("button", { name: "Profil", exact: true }).click();
  await expect(page.locator(".balance")).toContainText("3");
  await page.getByRole("button", { name: "Mon calendrier" }).click();
  await expect(page.getByText("Léa · Beauté & création")).toBeVisible();
  await page.getByRole("button", { name: "Annuler", exact: true }).click();
  await page.getByRole("button", { name: "Fermer", exact: true }).click();
  await expect(page.locator(".balance")).toContainText("4");
  await page.reload();
  await page.getByRole("button", { name: "Messages", exact: true }).click();
  await page.getByRole("button", { name: /Léa Salut/ }).click();
  await expect(
    page.getByText("Salut, je voudrais découvrir le nail art !").last(),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
test("themes, filters, downward gesture and mobile layout", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Filtrer les profils" }).click();
  await page
    .getByRole("button", { name: "Photo & vidéo", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Photo au smartphone." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Filtrer les profils" }).click();
  await page
    .getByRole("button", { name: "Tout explorer", exact: true })
    .click();
  const b = (await page.getByRole("group").boundingBox())!;
  await page.mouse.move(b.x + 130, b.y + 80);
  await page.mouse.down();
  await page.mouse.move(b.x + 130, b.y + 190, { steps: 8 });
  await page.mouse.up();
  await expect(
    page.getByRole("heading", { name: "Photo au smartphone." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Profil", exact: true }).click();
  await page.getByRole("button", { name: "Mon ambiance" }).click();
  await page.getByRole("button", { name: "Jardin sauge" }).click();
  await page.getByRole("button", { name: "Fermer", exact: true }).click();
  await expect(page.locator(".app")).toHaveClass(/theme-sage/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("all bundled images load, desktop and small iPhone screenshots", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".hero-image")).toBeVisible();
  await page.waitForFunction(() =>
    Array.from(document.images).every((i) => i.complete && i.naturalWidth > 0),
  );
  await page.screenshot({ path: "test-results/desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "test-results/iphone.png", fullPage: true });
  await page.setViewportSize({ width: 320, height: 568 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "test-results/small-iphone.png",
    fullPage: true,
  });
});
test("profile edits persist and simulated blocking removes a profile", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Profil", exact: true }).click();
  await page.getByRole("button", { name: "Modifier mon profil" }).click();
  await page.getByLabel("Prénom ou pseudo fictif").fill("Camille");
  await page.getByRole("button", { name: "Enregistrer", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Camille." })).toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: "Profil", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Camille." })).toBeVisible();
  await page.getByRole("button", { name: "Découverte", exact: true }).click();
  await page.getByRole("button", { name: "Signaler ou bloquer" }).click();
  await page.getByRole("button", { name: "Bloquer ce profil" }).click();
  await expect(
    page.getByRole("heading", { name: "Nail art & manucure." }),
  ).toHaveCount(0);
});

test("welcome guide, explicit entry and replay from profile", async ({
  page,
}) => {
  await page.evaluate(() => localStorage.removeItem("ss-onboarded-v2"));
  await page.reload();
  await expect(
    page.getByRole("region", { name: "Bienvenue et guide de SkillSwap" }),
  ).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Navigation principale" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Étape suivante du guide" }).click();
  await expect(
    page.getByRole("heading", { name: "Passe de l’autre côté." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Étape suivante du guide" }).click();
  await expect(
    page.getByRole("heading", { name: "Un intérêt. Un bonjour." }),
  ).toBeVisible();
  await page.screenshot({
    path: "test-results/guide-iphone.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Accéder à l’appli" }).click();
  await expect(page.getByRole("heading", { name: "Découvrir." })).toBeVisible();
  await expect(page.locator(".welcome")).toHaveCount(0);
  await page.reload();
  await expect(page.getByRole("heading", { name: "Découvrir." })).toBeVisible();
  await page.getByRole("button", { name: "Profil", exact: true }).click();
  await page.getByRole("button", { name: "Revoir le petit guide" }).click();
  await expect(
    page.getByRole("button", { name: "Accéder à l’appli" }),
  ).toBeVisible();
});
test("application controls fit the viewport on small and modern iPhones", async ({
  page,
}) => {
  for (const size of [
    { width: 320, height: 568 },
    { width: 390, height: 844 },
    { width: 430, height: 932 },
  ]) {
    await page.setViewportSize(size);
    const card = await page.locator(".profile-card").boundingBox();
    const actions = await page.locator(".card-actions").boundingBox();
    const nav = await page
      .getByRole("navigation", { name: "Navigation principale" })
      .boundingBox();
    expect(card!.height).toBeGreaterThan(200);
    expect(actions!.y + actions!.height).toBeLessThanOrEqual(nav!.y);
    expect(
      await page.evaluate(() => document.documentElement.scrollHeight),
    ).toBeLessThanOrEqual(size.height);
    await page.getByRole("group").focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.locator(".back-heading img")).toHaveAttribute(
      "src",
      "./images/lea.webp",
    );
    await page.keyboard.press("ArrowLeft");
  }
});

test("real touch events flip and advance the card without scrolling the app", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("/");
  await page.getByRole("button", { name: "Accéder à l’appli" }).tap();
  const client = await context.newCDPSession(page);
  const b = (await page.getByRole("group").boundingBox())!;
  async function swipe(x: number, y: number, endX: number, endY: number) {
    await client.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x, y }],
    });
    for (let i = 1; i <= 8; i++)
      await client.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [
          { x: x + ((endX - x) * i) / 8, y: y + ((endY - y) * i) / 8 },
        ],
      });
    await client.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
  }
  await swipe(b.x + 60, b.y + 150, b.x + 180, b.y + 90);
  await expect(page.locator(".profile-card")).toHaveCSS(
    "transform",
    /matrix3d/,
  );
  await expect(page.locator(".card-back")).not.toHaveAttribute("inert", "");
  await page.waitForTimeout(650);
  await swipe(b.x + 180, b.y + 100, b.x + 180, b.y + 210);
  await expect(
    page.getByRole("heading", { name: "Photo au smartphone." }),
  ).toBeVisible();
  expect(await page.evaluate(() => scrollY)).toBe(0);
  await context.close();
});

test("short guide fits every step on small and large iPhones", async ({
  page,
}) => {
  await page.goto("/?guide=1");
  for (const size of [
    { width: 320, height: 568 },
    { width: 390, height: 844 },
    { width: 430, height: 932 },
  ]) {
    await page.setViewportSize(size);
    for (let step = 0; step < 3; step++) {
      await page
        .getByRole("button", { name: `Étape ${step + 1} :`, exact: false })
        .click();
      const cta = await page
        .getByRole("button", { name: "Accéder à l’appli" })
        .boundingBox();
      expect(cta!.y + cta!.height).toBeLessThanOrEqual(size.height);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(size.width);
      expect(
        await page.evaluate(() => document.documentElement.scrollHeight),
      ).toBeLessThanOrEqual(size.height + 1);
    }
  }
  await page.getByRole("button", { name: "Accéder à l’appli" }).click();
  await expect(page).not.toHaveURL(/guide=1/);
  await expect(page.getByRole("heading", { name: "Découvrir." })).toBeVisible();
});

test("conversation suggestions fill the composer without sending and retain service context", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Écrire à Léa" }).click();
  await expect(page.locator(".chat-service-strip")).toContainText(
    "Beauté & création",
  );
  await page.getByRole("button", { name: "Comment ça se passe ?" }).click();
  await expect(page.getByRole("textbox", { name: "Ton message" })).toHaveValue(
    "Comment ça se passe ?",
  );
  await expect(page.locator(".bubble.mine")).toHaveCount(0);
  await page.getByRole("button", { name: "Envoyer le message" }).click();
  await expect(page.locator(".bubble.mine")).toHaveText(
    "Comment ça se passe ?",
  );
  await expect(page.locator(".conversation-starters")).toHaveCount(0);
  await page.getByRole("button", { name: "Proposer un créneau" }).click();
  await expect(
    page.getByRole("button", { name: "Confirmer la réservation fictive" }),
  ).toBeVisible();
});

test("demo profile portrait persists and keyboard navigation survives card replacement", async ({
  page,
}) => {
  const card = page.getByRole("group");
  await card.focus();
  await page.keyboard.press("ArrowDown");
  await expect(
    page.getByRole("heading", { name: "Photo au smartphone." }),
  ).toBeVisible();
  await expect(page.getByRole("group")).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".card-back")).not.toHaveAttribute("inert", "");
  await page.getByRole("button", { name: "Profil", exact: true }).click();
  await page.getByRole("button", { name: "Modifier mon profil" }).click();
  await page
    .getByRole("button", { name: "Choisir le portrait fictif de Inès" })
    .click();
  await page.getByRole("button", { name: "Enregistrer", exact: true }).click();
  await expect(
    page.getByRole("img", { name: "Photo du profil fictif" }),
  ).toHaveAttribute("src", "./images/ines.webp");
  await page.reload();
  await page.getByRole("button", { name: "Profil", exact: true }).click();
  await expect(
    page.getByRole("img", { name: "Photo du profil fictif" }),
  ).toHaveAttribute("src", "./images/ines.webp");
});
