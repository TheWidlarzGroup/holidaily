import { eachDayOfInterval } from 'date-fns'
import { genRandomDayOffRequest } from './requestFactory'

describe('genDayOff', () => {
  // skipping because poland-public-holidays causes error in test environment. I have created an issue on github https://github.com/szydlovski/poland-public-holidays/issues/3
  it.skip('should not throw invalid interval error', () => {
    jest.mock('poland-public-holidays', () => ({
      isHoliday: () => false,
    }))
    for (let i = 0; i < 10000; i++) {
      const request = genRandomDayOffRequest()
      expect(
        eachDayOfInterval({ start: new Date(request.startDate), end: new Date(request.endDate) })
      ).not.toThrow()
    }
  })
})
