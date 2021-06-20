import {
  isTimeIntervalLessThanWeek,
  displayWeekday,
  displayDayShort,
  setDateToBeDisplayed,
  qtyOnHolidayNow,
  displayDDMonYYYY,
} from 'utils/functions'
import { TEAM_MATES_AKADEMIA, TEAM_MATES_DEV } from 'utils/mocks/userMocks'
import { DateTime } from 'luxon'

describe('isTimeIntervalLessThanWeek', () => {
  const inputDayFalse = DateTime.fromISO('2021-06-01')
  const inputDayTrue = DateTime.fromISO('2021-06-08')
  it('check if interval is less than 7 days from today', () => {
    expect(isTimeIntervalLessThanWeek(inputDayFalse)).toBe(false)
    expect(isTimeIntervalLessThanWeek(inputDayTrue)).toBe(true)
  })
})

describe('displayWeekday', () => {
  const inputDay = DateTime.fromISO('2021-06-09')
  it('should display weekday in proper language', () => {
    expect(displayWeekday(inputDay, 'pl')).toBe('środa')
    expect(displayWeekday(inputDay, 'en')).toBe('Wednesday')
  })
})

describe('displayDayShort', () => {
  const inputDay = DateTime.fromISO('2021-06-09')
  it('should display day and month name in proper language', () => {
    expect(displayDayShort(inputDay, 'pl')).toBe('9 czerwiec')
    expect(displayDayShort(inputDay, 'en')).toBe('9 June')
  })
})

describe('setDateToBeDisplayed', () => {
  const outputIfTrue = DateTime.fromISO('2021-06-11')
  const outputIfFalse = DateTime.fromISO('2021-06-09')
  it('should add or substract one day', () => {
    expect(setDateToBeDisplayed('2021-06-10', true)).toEqual(outputIfTrue)
    expect(setDateToBeDisplayed('2021-06-10', false)).toEqual(outputIfFalse)
  })
})

describe('qtyOnHolidayNow', () => {
  it('sums up mates currently on holidays', () => {
    expect(qtyOnHolidayNow(TEAM_MATES_AKADEMIA)).toBe(3)
    expect(qtyOnHolidayNow(TEAM_MATES_DEV)).toBe(0)
  })
})

describe('displayDDMonYYYY', () => {
  const inputDate = DateTime.fromISO('2021-06-11')
  it('should display date in proper format', () => {
    expect(displayDDMonYYYY(inputDate, 'en')).toBe('11 Jun 2021')
    expect(displayDDMonYYYY(inputDate, 'pl')).toBe('11 cze 2021')
  })
})
