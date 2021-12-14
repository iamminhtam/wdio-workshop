export default new (class CartPage {
  async totalPrice(): Promise<number>{
    const totalPrice = await $(`#subtotal-price`);
    const totalValue = (await totalPrice.getText()).split('$')[1];
    return parseInt(totalValue);
  }

  get itemsPrice() {
    return $$(`//h6[contains(@data-test-purchase-price,'true')]`);
  }

  get addButtons() {
    return $$(`//button[contains(@data-test-add,'true')]`);
  }

  async randomAddedItem(): Promise<number> {
    const totalItems = (await this.itemsPrice).length;
    return Math.floor(Math.random() * totalItems) + 1;
  }

  async randomItemPrice(random: number): Promise<number> {
    const randomItemPrice = this.itemsPrice[random];
    const randomPrice = (await randomItemPrice.getText()).split('$')[1];
    return parseInt(randomPrice);
  }

  get removeButtons() {
    return $$(`//button[contains(@data-test-remove,'true')]`);
  }
});