const floodShopPage = require('../../pages/floodShop.page') 

describe('Take the challenge at Flood Shop', function () {
  this.retries(2);
  it('Challenge 1-4', async() => {
  
    await floodShopPage.open(`https://element-challenge.flood.io/`);
    await floodShopPage.clickTakeChallengeButton()

    // challenge 1
    const discountPercent = await floodShopPage.getPercent();
    await floodShopPage.answerChallenge1(discountPercent);
    await floodShopPage.clickCheckButton();

    // assert
    expect(await floodShopPage.confirmMessageContent()).toBe(`Your answer is correct!`)
    await floodShopPage.clickNextButton();

    // challenge 2
    await floodShopPage.scrollToNewArrivals();
    expect(await floodShopPage.newArrivalsPanel.isDisplayedInViewport()).toBe(true);
    // need to review
    // const numberOfProducts = await floodShopPage.numberOfProducts();
    // await floodShopPage.answerChallenge2(numberOfProducts);
    // await floodShopPage.clickCheckButton();

    // // assert
    // await floodShopPage.clickNextButton();

    // // // challenge 3
    // await floodShopPage.clickReviewTheDealButton();
    // await floodShopPage.clickCopyTheCodeButton();


    // await floodShopPage.clickPromotionTextBox();
    // await floodShopPage.pasteText();
    // await floodShopPage.clickCheckButton();

    // // assert
    // await floodShopPage.clickNextButton();

    // // // challenge 4
    // await floodShopPage.goToProductPage()
    // await floodShopPage.clickCheckButton();

    // // assert
    // await floodShopPage.clickNextButton();

  })
})