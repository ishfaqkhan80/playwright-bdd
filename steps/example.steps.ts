import { createBdd } from "playwright-bdd";
import { expect } from "@playwright/test";

const { Given, When, Then } = createBdd();

Given("at jeg er på Playwright hjemmesiden", async ({ page }) => {
  await page.goto("https://playwright.dev");
});

When("jeg ser på sidetittelen", async ({ page }) => {
  //Tittel lastes automatisk, ingen action nødvendig
});

Then(
  "skal tittelen inneholde {string}",
  async ({ page }, forventetTekst: string) => {
    await expect(page).toHaveTitle(new RegExp(forventetTekst, "i"));
  }
);
