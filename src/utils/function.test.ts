import {
  isTimeIntervalLessThanWeek,
  displayWeekday,
  displayDayShort,
  setDateToBeDisplayed,
  qtyOnHolidayNow,
} from 'utils/functions'
import { DateTime } from 'luxon'

describe('Data interval', () => {
  const inputDayFalse = DateTime.fromISO('2021-06-01')
  const inputDayTrue = DateTime.fromISO('2021-06-08')
  it('check if interval is less than 7 days from today', () => {
    expect(isTimeIntervalLessThanWeek(inputDayFalse)).toBe(false)
    expect(isTimeIntervalLessThanWeek(inputDayTrue)).toBe(true)
  })
})

describe('Data display as weekday', () => {
  const inputDay = DateTime.fromISO('2021-06-09')
  it('should display weekday in proper language', () => {
    expect(displayWeekday(inputDay, 'pl')).toBe('środa')
    expect(displayWeekday(inputDay, 'en')).toBe('Wednesday')
  })
})

describe('Data display day', () => {
  const inputDay = DateTime.fromISO('2021-06-09')
  it('should display day and month name in proper language', () => {
    expect(displayDayShort(inputDay, 'pl')).toBe('9 czerwiec')
    expect(displayDayShort(inputDay, 'en')).toBe('9 June')
  })
})

describe('Data display', () => {
  const outputIfTrue = DateTime.fromISO('2021-06-11')
  const outputIfFalse = DateTime.fromISO('2021-06-09')
  it('should add or substract one day', () => {
    expect(setDateToBeDisplayed('2021-06-10', true)).toEqual(outputIfTrue)
    expect(setDateToBeDisplayed('2021-06-10', false)).toEqual(outputIfFalse)
  })
})

describe('reduce', () => {
  const usersList1 = [
    { holidays: { isOnHoliday: true } },
    { holidays: { isOnHoliday: true } },
    { holidays: { isOnHoliday: false } },
    { holidays: { isOnHoliday: true } },
  ]
  const usersList2 = [
    { holidays: { isOnHoliday: false } },
    { holidays: { isOnHoliday: false } },
    { holidays: { isOnHoliday: false } },
    { holidays: { isOnHoliday: false } },
  ]

  it('sums up mates currently on holidays', () => {
    expect(qtyOnHolidayNow(usersList1)).toBe(3)
    expect(qtyOnHolidayNow(usersList2)).toBe(0)
  })
})
