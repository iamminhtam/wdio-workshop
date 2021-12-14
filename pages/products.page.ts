export enum FilterMenu {
  Category = "Category",
  Size = "Size",
  PriceRange = "Price range"
}

export default new (class ProductsPage {
  itemXpath = `//a[contains(@href,'products')]//img`;

  async filterMenu(menu: string) {
    return $(`//h5[contains(text(),'${menu}')]`);
  }

  async scrollToFilterMenu(menu: string): Promise<void> {
    await (await this.filterMenu(menu)).scrollIntoView();
  }

  async moveToFilterMenu(menu: string): Promise<void> {
    await (await this.filterMenu(menu)).moveTo();
  }

  async totalItems() {
    return $$(`//a[contains(@href,'products')]//img`);
  }

  get minSlider() {
    return $(`//span[contains(@data-index,0)]`);
  }

  get maxSlider() {
    return $(`//span[contains(@data-index,1)]`);
  }

  async pressArrowRight() {
    await browser.keys("ArrowRight");
  }

  async pressArrowLeft() {
    await browser.keys("ArrowLeft");
  }

  minSliderPromises: Promise<void>[] = [];
  async selectMinPrice(minPriceValue: number): Promise<void> {
    await this.minSlider.click();
    for (let i = 0; i < minPriceValue - 50; i++) {
      // this.minSliderPromises.push(this.pressArrowRight());
      await this.pressArrowRight();
    }

    // await Promise.all(this.minSliderPromises);
  }

  maxSliderPromises: Promise<void>[] = [];
  async selectMaxPrice(maxPriceValue: number): Promise<void> {
    await this.maxSlider.click();
    for (let i = 0; i < 1995 - maxPriceValue; i++) {
      // this.maxSliderPromises.push(this.pressArrowLeft());
      await this.pressArrowLeft();
    }

    // await Promise.all(this.maxSliderPromises);
  }

  async totalProducts(): Promise<number> {
    let areItemsEmpty = false;

    let itemCount = 0;
    const pageCount = (await $$("li")).length - 2;

    const totalItems = await $$(this.itemXpath);
    if (totalItems.length === 0) {
      areItemsEmpty = true;
    }

    if (!areItemsEmpty) {
      if (pageCount === 0) {
        itemCount = totalItems.length;
      } else {
        const lastPageButton = await $(
          `//button[contains(@aria-label,'Go to page ${pageCount}')]`
        );
        await lastPageButton.click();
        const totalItemsLastPage = await $$(this.itemXpath);
        itemCount = totalItemsLastPage.length;
        itemCount += (pageCount - 1) * 18;
      }
    }
    return itemCount;
  }

  get openAddToCartButton() {
    return $(`//div[contains(@class,'MuiCollapse-entered')]`);
  }

  get addToCartButton() {
    return $(`//button//span[contains(text(),'Add to cart')]`);
  }

  get closeButton() {
    return $(
      `//button[contains(@data-test-product-detail-modal-close,'true')]`
    );
  }

  get page1Button() {
    return $(`//button[contains(@aria-label,'Go to page 1')]`);
  }

  get nextPageButton() {
    return $(`//button[contains(@aria-label,'Go to next page')]`);
  }

  async addItemsToCartAtCurrentPage(): Promise<void> {
    const itemsOnCurrentPage = await $$(this.itemXpath);
    for (let i = 0; i < itemsOnCurrentPage.length; i++) {
      await itemsOnCurrentPage[i].scrollIntoView();
      await itemsOnCurrentPage[i].moveTo();
      await this.openAddToCartButton.click();
      await this.addToCartButton.click();
      await this.closeButton.click();
    }
  }

  async addAllFilterProductsToCart(): Promise<void> {
    const pageCount = (await $$("li")).length - 2;

    await this.addItemsToCartAtCurrentPage();

    if (pageCount !== 0) {
      await this.page1Button.click();

      for (let i = 0; i < pageCount - 1; i++) {
        await this.addItemsToCartAtCurrentPage();
        await this.nextPageButton.click();
      }
    }
  }

  async checkbox(value: string) {
    return $(`//input[@name='${value}']`);
  }

  async resetFilterPrice(currentMinPrice: number, currentMaxPrice: number) {
    await this.minSlider.click();
    for (let i = 0; i < (currentMinPrice - 50); i++) {
      await this.pressArrowLeft();
    }

    await this.maxSlider.click();
    for (let i = 0; i < (2007 - currentMaxPrice); i++) {
      await this.pressArrowRight();
    }
  }
})();
