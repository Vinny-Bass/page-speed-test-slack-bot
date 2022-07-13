const { expect, describe, test, beforeEach, jest: requiredJest, beforeAll } = require('@jest/globals')
const PageSpeedHandler = require('../src/pageSpeedHandler.js')

const mocks = {
  googlePageSpeedReturn: require('./mocks/google_api_example_response.json')
}

describe('Page Speed Handler Test Suite', () => {
  let pageSpeedHandler = {}

  beforeAll(() => {
    pageSpeedHandler = new PageSpeedHandler()
  })

  beforeEach(() => {
    requiredJest.restoreAllMocks()
    requiredJest.clearAllMocks()
  })

  test('stringIsAValidUrl - Should return false when a invalid url is passed', () => {
    const invalidUrl = 'invalid Url'

    const result = pageSpeedHandler.stringIsAValidUrl(invalidUrl)

    expect(result).toBe(false)
  })

  test('stringIsAValidUrl - Should return true when a valid url is passed', () => {
    const invalidUrl = 'https://startse.com/'

    const result = pageSpeedHandler.stringIsAValidUrl(invalidUrl)

    expect(result).toBe(true)
  })

  test('setUpQuery -  Should return a valid querystring', () => {
    const testUrl = 'https://startse.com'

    const expected = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https%3A%2F%2Fstartse.com'
    const result = pageSpeedHandler.setUpQuery(testUrl)

    expect(result).toBe(expected)
  })

  test('getPageSpeedInsights - Should raise an error when the url is invalid', async () => {
    const url = 'invalid url'
    await expect(async () => {
      await pageSpeedHandler.getPageSpeedInsights(url)
    }).rejects.toThrow('Invalid Url')
  })

  test('getPageSpeedInsights - Should return speed information about a page', async () => {
    const url = 'https://startse.com'

    requiredJest.spyOn(
      pageSpeedHandler,
      pageSpeedHandler.getPageSpeedInsights.name
    ).mockResolvedValue(mocks.googlePageSpeedReturn)

    const result = await pageSpeedHandler.getPageSpeedInsights(url)

    expect(result).toBe(mocks.googlePageSpeedReturn)
  })

  test('getFormatedPageSpeedInsights - Should return formated information about the page speed', async () => {
    const url = 'https://startse.com'

    requiredJest.spyOn(
      pageSpeedHandler,
      pageSpeedHandler.getPageSpeedInsights.name
    ).mockResolvedValue(mocks.googlePageSpeedReturn)

    const expected = `The quality of the page in desktop is: "SLOW"`
    const result = await pageSpeedHandler.getFormatedPageSpeedInsights(url)

    expect(result).toBe(expected)
  })

})