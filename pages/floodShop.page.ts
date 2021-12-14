export default new (class FloodShopPage {
  get takeChallengeButton() {
    return $("span=TAKE THE CHALLENGE");
  }

  async getPercent(): Promise<string> {
    const h2Element = await $("h2");
    const discountMsg = await h2Element.getText();
    return discountMsg.split(" ")[3];
  }

  async categoryMenu(category: string) {
    return $(
      `//div[@aria-label='new-in-filters']//button[@value='${category}']`
    );
  }

  async clickCategory(category: string): Promise<void> {
    await (await this.categoryMenu(category)).click();
  }

  get newArrivalsPanel() {
    return $("#new-arrivals-panel");
  }

  get numberOfProducts() {
    return $$("#new-arrivals-panel a").length;
  }

  get revealTheDealBtn() {
    return $("span=Reveal the deal");
  }

  get copyTheCodeBtn() {
    return $("span=Copy the code");
  }

  get productMenu() {
    return $(`//header//a[@href='/products']`);
  }

  get cartButton() {
    return $(`//header//a[@href='/cart']`);
  }

  async scrollToNewArrivals(): Promise<void> {
    (await this.newArrivalsPanel).scrollIntoView();
  }

  async clickTakeChallengeButton(): Promise<void> {
    await this.takeChallengeButton.click();
  }

  async clickReviewTheDealButton(): Promise<void> {
    await this.revealTheDealBtn.click();
  }

  async clickCopyTheCodeButton(): Promise<void> {
    await this.copyTheCodeBtn.click();
  }

  async goToProductPage(): Promise<void> {
    await this.productMenu.click();
  }

  async open(path: string): Promise<void> {
    await browser.url(path);
    await browser.maximizeWindow();
  }
})();
