class FloodShopPage{
  /**
   * define elements
   */
  get takeChallengeButton() { return browser.$(`span=TAKE THE CHALLENGE`); }

  get title() { return browser.$(`#new-arrivals-panel h3`); }

  async getPercent() {
    const h2Element = await browser.$(`h2`);
    const discountMsg = await h2Element.getText();
    return discountMsg.split(' ')[3]
  }

  async answerChallenge1(percent) {
    const answer = await browser.$(`#challenge-1-option-${percent.split('%')[0]}`);
    await answer.click();
  }

  get checkButton() { return browser.$(`span=CHECK`) }

  get nextButton() { return browser.$(`span=NEXT`) }

  get newArrivalsPanel() { return browser.$(`#new-arrivals-panel`) }

  get numberOfProducts() { return browser.$$(`*=/products/`).length }

  async answerChallenge2(products) {
    const answer = await browser.$(`#challenge-2-option-${products.toString()}`);
    await answer.click();
  }

  get revealTheDealBtn() { return browser.$(`span=Reveal the deal`)};

  get copyTheCodeBtn() { return browser.$(`span=Copy the code`)}

  get promotionTextBox() { return browser.$(`#challenge-3-promotion-code`)}

  get productMenu() { return browser.$(`header`).$(`*=/products`) }
  /**
   * define or overwrite page methods
   */

  async scrollToNewArrivals() {
    await this.newArrivalsPanel.waitForDisplayed();
    await this.newArrivalsPanel.scrollIntoView();
  }

  async clickTakeChallengeButton() {
    await this.takeChallengeButton.waitForClickable();
    await this.takeChallengeButton.click();
  }

  async clickCheckButton() {
    await this.checkButton.waitForClickable();
    await this.checkButton.click();
  }

  async clickNextButton() { 
    await this.nextButton.waitForClickable();
    await this.nextButton.click();
  }

  async clickReviewTheDealButton() { 
    await this.revealTheDealBtn.waitForClickable();
    await this.revealTheDealBtn.click();
  }

  async clickCopyTheCodeButton() { 
    await this.copyTheCodeBtn.waitForClickable();
    await this.copyTheCodeBtn.click();
  }

  async clickPromotionTextBox() {
    await this.promotionTextBox.waitForClickable();
    await this.promotionTextBox.click();
  }

  async pasteText() {
    await browser.keys(['Shift', 'Insert']);
  }

  async goToProductPage() {
    await this.productMenu.waitForClickable();
    await this.productMenu.click();
  }

  async open(path) {
    await browser.url(path);
    await browser.maximizeWindow();
  }

  get confirmMessage() { return browser.$(`#challenges-popup`).$(`p:nth-last-child(1)`) }
  
  async confirmMessageContent() { 
    await this.confirmMessage.waitForDisplayed();
    await this.confirmMessage.getText();
  }
}

module.exports = new FloodShopPage()