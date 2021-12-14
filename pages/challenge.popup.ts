export default new (class ChallengePopup {

  async answerChallenge1(percent: string): Promise<void> {
    const answer = await $(`#challenge-1-option-${percent.split("%")[0]}`);
    await answer.click();
  }

  get checkButton() {
    return $("span=CHECK");
  }
  async clickCheckButton() {
    await this.checkButton.click();
  }

  get nextButton() {
    return $("span=NEXT");
  }
  async clickNextButton() {
    await this.nextButton.click();
  }

  get confirmMessage() {
    return $(`(//div[@id='challenges-popup']//p)[last()]`);
  }

  get doneMessage() {
    return $(`//h5[contains(text(),'hooray!')]`);
  }

  get category() {
    return $("#challenge-2-category");
  }

  get promotionTextBox() {
    return $("#challenge-3-promotion-code");
  }

  async clickPromotionTextBox(): Promise<void> {
    await this.promotionTextBox.click();
  }

  async pasteText(): Promise<void> {
    await browser.keys(["Shift", "Insert"]);
  }

  async answerChallenge2(products: number) {
    const answer = await $(`#challenge-2-option-${products}`);
    await answer.click();
  }

  async answerChallenge5(products: number) {
    const answer = await $(`#challenge-5-amount-products`);
    await answer.click();
    await answer.setValue(products);
  }

  async minPrice(): Promise<number> {
    const minPriceText = await $(`//span[contains(@id,'min-price')]`);
    let minValue = await minPriceText.getText();
    if (minValue.includes('$')) { minValue = minValue.split("$")[1]; }
    return parseInt(minValue);
  }

  async maxPrice(): Promise<number> {
    const maxPriceText = await $(`//span[contains(@id,'max-price')]`);
    let maxValue = await maxPriceText.getText();
    if (maxValue.includes('$')) { maxValue = maxValue.split("$")[1]; }
    return parseInt(maxValue);
  }

  async categoryChallenge7Value(): Promise<string> {
    return (await $(`#challenge-7-category`)).getText();
  }

  async size(): Promise<string> {
    return (await $(`#challenge-7-size`)).getText();
  }

});