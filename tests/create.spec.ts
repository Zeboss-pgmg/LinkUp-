import { test, expect } from "@playwright/test";

test("dedicated Create tab preserves a draft between tabs and saves a request", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/");
  await page.getByRole("button", { name: "Accéder à l’appli" }).click();
  const nav = page.getByRole("navigation", { name: "Navigation principale" });
  await expect(nav.getByRole("button")).toHaveCount(5);
  for (const button of await nav.getByRole("button").all()) {
    const box = (await button.boundingBox())!;
    expect(box.width).toBeGreaterThanOrEqual(44);
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(320);
  }
  await nav.getByRole("button", { name: "Créer", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Créer un post." })).toBeVisible();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: "Je cherche de l’aide" }).click();
  await page.getByLabel("Titre du service").fill("Besoin d’aide pour un montage");
  await page.getByLabel("Ce qu’on fera ensemble").fill("Une demande fictive pour apprendre à monter une courte vidéo de présentation.");
  await page.getByRole("button", { name: "Créer une compétence", exact: true }).click();
  await page.getByLabel("Nom de la compétence").fill("Apprendre le crochet");
  await page.getByRole("button", { name: "Créer un post", exact: true }).click();
  await expect(page.getByLabel("Titre du service")).toHaveValue("Besoin d’aide pour un montage");
  await nav.getByRole("button", { name: "Explorer", exact: true }).click();
  await nav.getByRole("button", { name: "Créer", exact: true }).click();
  await expect(page.getByLabel("Titre du service")).toHaveValue("Besoin d’aide pour un montage");
  await expect(page.getByRole("button", { name: "Je cherche de l’aide" })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Publier mon annonce fictive" }).click();
  await expect(page.locator(".own-listing")).toContainText("Besoin d’aide pour un montage");
  await nav.getByRole("button", { name: "Créer", exact: true }).click();
  await expect(page.getByLabel("Titre du service")).toHaveValue("");
  await page.getByRole("button", { name: "Créer une compétence", exact: true }).click();
  await expect(page.getByLabel("Nom de la compétence")).toHaveValue("Apprendre le crochet");
});
