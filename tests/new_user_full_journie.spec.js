import { test } from "@playwright/test";
import { ProductsPage } from "./../page-objects/ProductPage.js";

test.only("New user full end-to-end test journey", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.visit();
  await page.pause();
});
