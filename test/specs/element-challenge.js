const floodShopPage = require('../../pages/floodShop.page')

describe('Take the challenge at Flood Shop', function () {
  // this.retries(2);

  before(async () => {
    await browser.maximizeWindow()
  })
  // afterEach(async (done) => {
  //   await floodShopPage.open(`https://element-challenge.flood.io`);
  // })

  const CORRECT_MESSAGE = 'Your answer is correct!'

  it('Challenge 1', async () => {
    await floodShopPage.open(`https://element-challenge.flood.io`)
    await floodShopPage.clickTakeChallengeButton()
    const discountPercent = await floodShopPage.getPercent()
    await floodShopPage.answerChallenge1(discountPercent)
    await floodShopPage.clickCheckButton()
    expect(await (await floodShopPage.confirmMessage).getText()).toBe(CORRECT_MESSAGE)

  })

  it('Challenge 2', async () => {
    await floodShopPage.clickNextButton()
    const category = await (await floodShopPage.category).getText()
    await floodShopPage.clickCategory(category)
    await floodShopPage.scrollToNewArrivals()
    expect(await floodShopPage.newArrivalsPanel.isDisplayedInViewport()).toBe(true)
    const numberOfProducts = await floodShopPage.numberOfProducts
    await floodShopPage.answerChallenge2(numberOfProducts)
    await floodShopPage.clickCheckButton()
    expect(await (await floodShopPage.confirmMessage).getText()).toBe(CORRECT_MESSAGE)

  })

  it('Challenge 3', async () => {
    await floodShopPage.clickNextButton()
    await floodShopPage.clickReviewTheDealButton()
    await floodShopPage.clickCopyTheCodeButton()
    await floodShopPage.clickPromotionTextBox()
    await floodShopPage.pasteText()
    await floodShopPage.clickCheckButton()
    expect(await (await floodShopPage.confirmMessage).getText()).toBe(CORRECT_MESSAGE)

  })

  it('Challenge 4', async () => {
    await floodShopPage.clickNextButton()
    await floodShopPage.goToProductPage()
    await floodShopPage.clickCheckButton()
    expect(await floodShopPage.confirmMessage.getText()).toBe(CORRECT_MESSAGE)

  })
})