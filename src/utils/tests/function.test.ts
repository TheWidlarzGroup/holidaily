import {
  isTimeIntervalLessThanWeek,
  displayWeekday,
  displayDayShort,
  setDateToBeDisplayed,
  qtyOnHolidayNow,
  displayDDMonYYYY,
  displayDatesRange,
} from 'utils/functions'
import { TEAM_MATES_AKADEMIA, TEAM_MATES_DEV } from 'utils/mocks/userMocks'

import { parseISO, subDays } from 'date-fns'
import { setCurrentLocale } from 'utils/locale'
import '../../../i18n.js'

describe('isTimeIntervalLessThanWeek', () => {
  const inputDayFalse = subDays(new Date(), 100)
  const inputDayTrue = subDays(new Date(), 6)
  it('check if interval is less than 7 days from today', () => {
    expect(isTimeIntervalLessThanWeek(inputDayFalse)).toBe(false)
    expect(isTimeIntervalLessThanWeek(inputDayTrue)).toBe(true)
  })
})

describe('displayWeekday', () => {
  const inputDay = parseISO('2021-06-09')
  it('should display weekday in proper language', async () => {
    await setCurrentLocale('pl')
    expect(displayWeekday(inputDay)).toBe('środa')
    await setCurrentLocale('en')
    expect(displayWeekday(inputDay)).toBe('Wednesday')
  })
})

describe('displayDayShort', () => {
  const inputDay = parseISO('2021-06-09')
  it('should display day and month name in proper language', async () => {
    await setCurrentLocale('pl')
    expect(displayDayShort(inputDay)).toBe('9 czerwca')
    await setCurrentLocale('en')
    expect(displayDayShort(inputDay)).toBe('9 June')
  })
})

describe('setDateToBeDisplayed', () => {
  const outputIfTrue = parseISO('2021-06-11')
  const outputIfFalse = parseISO('2021-06-09')
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
  const inputDate = parseISO('2021-06-11')
  it('should display date in proper format', async () => {
    await setCurrentLocale('pl')
    expect(displayDDMonYYYY(inputDate)).toBe('11 cze 2021')
    await setCurrentLocale('en')
    expect(displayDDMonYYYY(inputDate)).toBe('11 Jun 2021')
  })
})

describe('displayDatesRange', () => {
  it('show holidays range', async () => {
    await setCurrentLocale('en')
    expect(displayDatesRange('2021-06-09', '2021-06-11')).toBe('9 - 11 June 2021')
    expect(displayDatesRange('2021-05-09', '2021-06-11')).toBe('9 May - 11 June 2021')
    expect(displayDatesRange('2021-12-24', '2022-01-07')).toBe('24 December 2021 - 7 January 2022')
    expect(displayDatesRange('2021-06-11', '2021-06-11')).toBe('11 June 2021')

    await setCurrentLocale('pl')
    expect(displayDatesRange('2021-06-11', '2021-06-11')).toBe('11 czerwca 2021')
  })
})
