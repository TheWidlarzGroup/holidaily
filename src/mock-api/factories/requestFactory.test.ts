import { eachDayOfInterval } from 'date-fns'
import { drawDates, genEndDate, genRandomDayOffRequest, genStartDate } from './requestFactory'

const DAY_IN_MS = 24 * 3600 * 1000
const isWeekend = (date: Date) => [0, 6].includes(date.getDay())
describe('genDayOff', () => {
  it('should not throw invalid interval error', () => {
    // function output is random and hard to test, so the for loop.
    for (let i = 0; i < 1000; i++) {
      const request = genRandomDayOffRequest()
      expect(isWeekend(new Date(request.startDate))).toBe(false)
      expect(isWeekend(new Date(request.endDate))).toBe(false)
      expect(() =>
        eachDayOfInterval({ start: new Date(request.startDate), end: new Date(request.endDate) })
      ).not.toThrow()
    }
  })
  it('helpers should not generate instances of Invalid Date', () => {
    for (let i = 0; i < 1000; i++) {
      const { futureDate, pastDate } = drawDates()
      expect(() => genStartDate(futureDate).toISOString()).not.toThrow()
      expect(() => genEndDate(pastDate).toISOString()).not.toThrow()
    }
  })
  it('past request should be happening in the past', () => {
    for (let i = 0; i < 10000; i++) {
      const request = genRandomDayOffRequest('past')
      expect(isWeekend(new Date(request.startDate))).toBe(false)
      expect(isWeekend(new Date(request.endDate))).toBe(false)
      const startTime = new Date(request.startDate).getTime()
      const endTime = new Date(request.endDate).getTime()
      expect(endTime - startTime).toBeGreaterThanOrEqual(DAY_IN_MS)
      expect(Date.now() - endTime).toBeGreaterThanOrEqual(DAY_IN_MS)
    }
  })

  it('accepted, declined and cancelled requests should be happening in the future', () => {
    for (let i = 0; i < 1000; i++) {
      let request = genRandomDayOffRequest('accepted')
      let startTime = new Date(request.startDate).getTime()
      let endTime = new Date(request.endDate).getTime()

      expect(isWeekend(new Date(request.startDate))).toBe(false)
      expect(isWeekend(new Date(request.endDate))).toBe(false)
      expect(endTime - startTime).toBeGreaterThan(DAY_IN_MS)
      expect(endTime - Date.now()).toBeGreaterThan(DAY_IN_MS)

      request = genRandomDayOffRequest('pending')
      startTime = new Date(request.startDate).getTime()
      endTime = new Date(request.endDate).getTime()
      expect(isWeekend(new Date(request.startDate))).toBe(false)
      expect(isWeekend(new Date(request.endDate))).toBe(false)
      expect(endTime - startTime).toBeGreaterThan(DAY_IN_MS)
      expect(endTime - Date.now()).toBeGreaterThan(DAY_IN_MS)

      request = genRandomDayOffRequest('cancelled')
      startTime = new Date(request.startDate).getTime()
      endTime = new Date(request.endDate).getTime()
      expect(isWeekend(new Date(request.startDate))).toBe(false)
      expect(isWeekend(new Date(request.endDate))).toBe(false)
      expect(endTime - startTime).toBeGreaterThan(DAY_IN_MS)
      expect(endTime - Date.now()).toBeGreaterThan(DAY_IN_MS)
    }
  })
})
