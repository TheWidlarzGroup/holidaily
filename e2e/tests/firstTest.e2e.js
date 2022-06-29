describe('First test - example', () => {
  beforeAll(async () => {
    await device.launchApp()
  })

  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('should have skip test on the splash screen', async () => {
    await expect(element(by.id('slider-touchable-opacity-skip'))).toBeVisible()
  })

  it('navigate to welcome screen onPress skip', async () => {
    await element(by.id('slider-touchable-opacity-skip')).tap()
    await expect(element(by.id('welcome-title'))).toBeVisible()
  })
})
