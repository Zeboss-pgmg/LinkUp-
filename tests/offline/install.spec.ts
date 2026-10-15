import { test, expect } from "@playwright/test";
test("installed web app reloads, explores and opens its privacy page offline", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Accéder à l’appli" }).click();
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.reload();
  await page.waitForFunction(() => !!navigator.serviceWorker.controller);
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole("heading", { name: "Découvrir." })).toBeVisible();
  await page.getByRole("button", { name: "Explorer", exact: true }).click();
  await page
    .getByRole("searchbox", { name: "Rechercher une compétence" })
    .fill("anglais");
  await expect(
    page.getByRole("heading", { name: "Pratiquer l’anglais sans stress." }),
  ).toBeVisible();
  await page.waitForFunction(() =>
    Array.from(document.images).every((i) => i.complete && i.naturalWidth > 0),
  );
  await page.goto("/privacy.html");
  await expect(
    page.getByRole("heading", {
      name: "Tes échanges de démo restent sur ton appareil.",
    }),
  ).toBeVisible();
});
