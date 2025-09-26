import { expect } from "@playwright/test";

export class Checkout {
  constructor(page) {
    this.page = page;

    this.basketCards = page.locator('[data-qa="basket-card"]');
    this.basketItemPrice = page.locator('[data-qa="basket-item-price"]');
    this.basketItemRemuveButton = page.locator('[data-qa="basket-card-remove-item"]');
    this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]');
  }
  remuveCheapestProduct = async () => {
    await this.basketCards.first().waitFor();
    const itemsBeforeRemoval = await this.basketCards.count();
    await this.basketItemPrice.first().waitFor();
    const allPriceTexts = await this.basketItemPrice.allInnerTexts();
    // allPriceTexts: [ '499$', '599$', '320$' ] -> justNumbers: [ 499, 599, 320 ]
    const justNumbers = allPriceTexts.map((element) => {
      const withoutDollarSign = element.replace("$", "");
      return parseInt(withoutDollarSign, 10);
    });
    const smallestPrice = Math.min(...justNumbers);
    const smallestPriceidx = justNumbers.indexOf(smallestPrice);
    const specificRemuvwButton = this.basketItemRemuveButton.nth(smallestPriceidx);
    await specificRemuvwButton.waitFor();
    await specificRemuvwButton.click();
    await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1);
    await this.page.pause();
  };

  continueToCheckout = async () => {
    await this.continueToCheckoutButton.waitFor();
    await this.continueToCheckoutButton.click();
    await this.page.pause();
  };
}
