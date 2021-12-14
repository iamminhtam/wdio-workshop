import floodShopPage from '../../pages/floodShop.page';
import productsPage, { FilterMenu } from '../../pages/products.page';
import cartPage from '../../pages/cart.page';
import challengePopup from '../../pages/challenge.popup';

describe('Take the challenge at Flood Shop', function () {
  // this.retries(2);

  const CORRECT_MESSAGE = 'Your answer is correct!';
  let currentMinPrice = 0;
  let currentMaxPrice = 0;

  before(async () => {
    await browser.maximizeWindow();
  });

  it('Challenge 1', async () => {
    await floodShopPage.open('https://element-challenge.flood.io');
    await floodShopPage.clickTakeChallengeButton();
    const discountPercent = await floodShopPage.getPercent();
    await challengePopup.answerChallenge1(discountPercent);
    await challengePopup.clickCheckButton();
    expect(await (await challengePopup.confirmMessage).getText()).toBe(
      CORRECT_MESSAGE
    );
  });

  it('Challenge 2', async () => {
    await challengePopup.clickNextButton();
    const category = await (await challengePopup.category).getText();
    await floodShopPage.clickCategory(category);
    await floodShopPage.scrollToNewArrivals();
    expect(await floodShopPage.newArrivalsPanel.isDisplayedInViewport()).toBe(
      true
    );
    const numberOfProducts = await floodShopPage.numberOfProducts;
    await challengePopup.answerChallenge2(numberOfProducts);
    await challengePopup.clickCheckButton();
    expect(await (await challengePopup.confirmMessage).getText()).toBe(
      CORRECT_MESSAGE
    );
  });

  it('Challenge 3', async () => {
    await challengePopup.clickNextButton();
    await floodShopPage.clickReviewTheDealButton();
    await floodShopPage.clickCopyTheCodeButton();
    await challengePopup.clickPromotionTextBox();
    await challengePopup.pasteText();
    await challengePopup.clickCheckButton();
    expect(await (await challengePopup.confirmMessage).getText()).toBe(
      CORRECT_MESSAGE
    );
  });

  it('Challenge 4', async () => {
    await challengePopup.clickNextButton();
    await floodShopPage.goToProductPage();
    await challengePopup.clickCheckButton();
    expect(await challengePopup.confirmMessage.getText()).toBe(CORRECT_MESSAGE);
  });

  it('Challenge 5', async () => {
    await challengePopup.clickNextButton();
    await productsPage.scrollToFilterMenu(FilterMenu.Size);

    const minPriceValue = await challengePopup.minPrice();
    currentMinPrice = minPriceValue;
    await productsPage.selectMinPrice(minPriceValue);
    
    const maxPriceValue = await challengePopup.maxPrice();
    currentMaxPrice = maxPriceValue;
    await productsPage.selectMaxPrice(maxPriceValue);

    const totalProducts = await productsPage.totalProducts();
    await challengePopup.answerChallenge5(totalProducts);
    await challengePopup.clickCheckButton();
    expect(await challengePopup.confirmMessage.getText()).toBe(CORRECT_MESSAGE);
  });

  it('Challenge 6', async () => {
    await challengePopup.clickNextButton();
    await productsPage.addAllFilterProductsToCart();
    await challengePopup.clickCheckButton();
    expect(await challengePopup.confirmMessage.getText()).toBe(CORRECT_MESSAGE);
  });

  it('Challenge 7', async () => {
    await challengePopup.clickNextButton();

    await productsPage.scrollToFilterMenu(FilterMenu.Category);

    // go to top page
    await browser.keys("ArrowUp");
    await browser.keys("ArrowUp");
    await browser.keys("ArrowUp");

    const category = await challengePopup.categoryChallenge7Value();
    await (await productsPage.checkbox(category)).click();

    const size = await challengePopup.size();
    await (await productsPage.checkbox(size)).click();
    await productsPage.scrollToFilterMenu(FilterMenu.Size);
    
    const minPriceValue = await challengePopup.minPrice();
    const maxPriceValue = await challengePopup.maxPrice();
    await productsPage.resetFilterPrice(currentMinPrice, currentMaxPrice);
    await productsPage.selectMinPrice(minPriceValue);
    await productsPage.selectMaxPrice(maxPriceValue);
    await challengePopup.clickCheckButton();
    expect(await challengePopup.confirmMessage.getText()).toBe(CORRECT_MESSAGE);
  });

  it('Challenge 8', async () => {
    await challengePopup.clickNextButton();
    await (await floodShopPage.cartButton).click();

    let totalPrice = await cartPage.totalPrice();
    const minPrice = await challengePopup.minPrice();
    const maxPrice = await challengePopup.maxPrice();

    if (totalPrice < minPrice) {
      let randomAddedItem = await cartPage.randomAddedItem();
      const addButtons = await cartPage.addButtons;
      while (totalPrice < minPrice) {
        await addButtons[randomAddedItem-1].scrollIntoView();
        await addButtons[randomAddedItem].click();
        totalPrice = await cartPage.totalPrice();
        randomAddedItem = await cartPage.randomAddedItem();
      }
    } 
    if (totalPrice > maxPrice) {
      const removeButtons = await cartPage.removeButtons;
      await removeButtons[0].scrollIntoView();
      // go to top page
      await browser.keys("ArrowUp");
      await browser.keys("ArrowUp");
      await browser.keys("ArrowUp");
      for (let i = 0; i < removeButtons.length; i++) {
        await removeButtons[i].click();
        totalPrice = await cartPage.totalPrice();
        if (totalPrice < maxPrice) break;
      }
    }

    await challengePopup.clickCheckButton();
    expect(await challengePopup.confirmMessage.getText()).toBe(CORRECT_MESSAGE);
    await challengePopup.clickNextButton();
    expect(await challengePopup.doneMessage.isDisplayed()).toBe(true);
  });

});
