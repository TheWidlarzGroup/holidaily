describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp()
  })

  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it.skip('should display "skip" on slider screen', async () => {
    await expect(element(by.id('skip'))).toBeVisible()
  })

  it('navigate to welcome screen onPress "skip', async () => {
    await element(by.id('skip')).tap()
    await expect(element(by.id('welcome'))).toBeVisible()
  })
})
