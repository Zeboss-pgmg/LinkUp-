import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Accéder à l’appli" }).click();
});
test("all categories contain demo services and accent-insensitive search selects a profile", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Explorer", exact: true }).click();
  for (const name of [
    "Beauté & création",
    "Photo & vidéo",
    "Art & artisanat",
    "Musique",
    "Cours & langues",
    "Numérique",
    "Cuisine",
    "Vie pratique",
  ]) {
    await page.getByRole("button", { name, exact: true }).click();
    expect(await page.locator(".talent-tile").count()).toBeGreaterThan(0);
    await page.getByRole("button", { name, exact: true }).click();
  }
  await page
    .getByRole("searchbox", { name: "Rechercher une compétence" })
    .fill("ceramique");
  await expect(
    page.getByRole("heading", { name: "Premiers pas en céramique." }),
  ).toBeVisible();
  await page
    .getByRole("button", {
      name: "Découvrir Premiers pas en céramique. avec Inès",
    })
    .click();
  await expect(
    page.getByRole("heading", { name: "Premiers pas en céramique." }),
  ).toBeVisible();
});
test("bookmark persists, opens the correct profile and can be removed", async ({
  page,
}) => {
  await page
    .getByRole("button", { name: "Enregistrer le profil de Léa" })
    .click();
  await page.reload();
  await page.getByRole("button", { name: "Profil", exact: true }).click();
  await page.getByRole("button", { name: "Favoris 1", exact: true }).click();
  await expect(page.locator(".saved-row")).toContainText(
    "Nail art & manucure.",
  );
  await page.getByRole("button", { name: /Léa Nail art/ }).click();
  await expect(
    page.getByRole("heading", { name: "Nail art & manucure." }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Retirer des favoris le profil de Léa" })
    .click();
  await expect(
    page.getByRole("button", { name: "Enregistrer le profil de Léa" }),
  ).toBeVisible();
});
test("publish, edit, archive and restore a fictional service announcement", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Publier une annonce" }).click();
  await page
    .getByLabel("Titre du service")
    .fill("Cours de montage de démonstration");
  await page
    .getByRole("combobox", { name: "Catégorie", exact: true })
    .selectOption("Photo & vidéo");
  await page
    .getByLabel("Ce qu’on fera ensemble")
    .fill(
      "Nous apprendrons les bases du montage avec des médias entièrement fictifs.",
    );
  await page
    .getByRole("button", { name: "Publier mon annonce fictive" })
    .click();
  await expect(page.locator(".own-listing")).toContainText(
    "Cours de montage de démonstration",
  );
  await page.reload();
  await page.getByRole("button", { name: "Profil", exact: true }).click();
  await page
    .getByRole("button", { name: "Modifier Cours de montage de démonstration" })
    .click();
  await page
    .getByLabel("Titre du service")
    .fill("Montage vidéo pour débutants");
  await page
    .getByRole("button", { name: "Enregistrer les modifications" })
    .click();
  await page
    .getByRole("button", { name: "Archiver Montage vidéo pour débutants" })
    .click();
  await expect(page.locator(".own-listing")).toContainText("Archivée");
  await page
    .getByRole("button", { name: "Réactiver Montage vidéo pour débutants" })
    .click();
  await expect(page.locator(".own-listing")).toContainText("Je propose");
});
test("privacy controls clear only demo data and return to the guide", async ({
  page,
}) => {
  await page.evaluate(() => localStorage.setItem("unrelated-setting", "keep"));
  await page
    .getByRole("button", { name: "Enregistrer le profil de Léa" })
    .click();
  await page.getByRole("button", { name: "Profil", exact: true }).click();
  await page
    .getByRole("button", { name: "Mes données de démonstration" })
    .click();
  await page
    .getByRole("button", { name: "Effacer mes données et recommencer" })
    .click();
  await expect(
    page.getByRole("button", { name: "Accéder à l’appli" }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => localStorage.getItem("ss-saved")),
  ).toBeNull();
  expect(
    await page.evaluate(() => localStorage.getItem("unrelated-setting")),
  ).toBe("keep");
});

test("a provider earns fictional credits once after accepting and completing a demo request", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Publier une annonce" }).click();
  await page
    .getByLabel("Titre du service")
    .fill("Initiation fictive au dessin");
  await page
    .getByLabel("Ce qu’on fera ensemble")
    .fill(
      "Nous découvrirons des techniques simples avec des exercices fictifs.",
    );
  await page
    .getByRole("combobox", { name: "Points fictifs", exact: true })
    .selectOption("2");
  await page
    .getByRole("button", { name: "Publier mon annonce fictive" })
    .click();
  await page
    .getByRole("button", {
      name: "Tester une demande pour Initiation fictive au dessin",
    })
    .click();
  await page
    .getByRole("button", { name: "Accepter la demande fictive" })
    .click();
  await page.getByRole("button", { name: "Confirmer la réalisation" }).click();
  await expect(
    page.getByRole("button", { name: "Confirmer la réalisation" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Fermer", exact: true }).click();
  await expect(page.locator(".balance")).toContainText("6");
  await page.reload();
  await page.getByRole("button", { name: "Profil", exact: true }).click();
  await expect(page.locator(".balance")).toContainText("6");
});
