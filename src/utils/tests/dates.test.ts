import {
  getMonthName,
  isWeekend,
  getDatesBetween,
  getDayName,
  getFormattedPeriod,
  getNumberOfWorkingDaysBetween,
} from 'utils/dates'
import { parseISO } from 'date-fns'
import { setCurrentLocale } from 'utils/locale'
import '../../../i18n.ts'

describe('checksIfItsWeekend', () => {
  const monday = parseISO('2021-06-07')
  const tuesday = parseISO('2021-06-08')
  const wednesday = parseISO('2021-06-09')
  const thursday = parseISO('2021-06-10')
  const friday = parseISO('2021-06-11')
  const saturday = parseISO('2021-06-12')
  const sunday = parseISO('2021-06-13')
  it('correctly determining the weekend', () => {
    expect(isWeekend(monday)).toBe(false)
    expect(isWeekend(tuesday)).toBe(false)
    expect(isWeekend(wednesday)).toBe(false)
    expect(isWeekend(thursday)).toBe(false)
    expect(isWeekend(friday)).toBe(false)
    expect(isWeekend(saturday)).toBe(true)
    expect(isWeekend(sunday)).toBe(true)
  })
})

describe('getsMonthName', () => {
  it('get proper month name from number', async () => {
    await setCurrentLocale('en')
    expect(getMonthName(1)).toBe('February')

    await setCurrentLocale('pl')
    expect(getMonthName(1)).toBe('luty')
  })
})

describe('getDatesBeetween', () => {
  it('returns the correct dates', () => {
    const dates = getDatesBetween('2021-06-19', '2021-06-22')
    const expected = ['2021-06-19', '2021-06-20', '2021-06-21', '2021-06-22']
    expect(dates).toMatchObject(expected)
  })

  it('works on months change', () => {
    const dates = getDatesBetween('2021-06-29', '2021-07-02')
    const expected = ['2021-06-29', '2021-06-30', '2021-07-01', '2021-07-02']
    expect(dates).toMatchObject(expected)
  })
})

describe('getStringDateFromISOString', () => {
  it('returns correct day name', async () => {
    const parsedDate = parseISO('2021-06-21')

    await setCurrentLocale('pl')
    expect(getDayName(parsedDate)).toBe('poniedziałek')
  })
})

describe('getFormattedPeriod', () => {
  it('should return valid date period', async () => {
    const dateA = new Date('2021-06-29')
    const dateB = new Date('2021-07-02')

    await setCurrentLocale('en')
    const englishResult = getFormattedPeriod(dateA, dateB)
    expect(englishResult).toBe('29 Jun - 2 Jul')

    await setCurrentLocale('pl')
    const polishResult = getFormattedPeriod(dateA, dateB)
    expect(polishResult).toBe('29 cze - 2 lip')
  })
})

describe('getWorkingDaysBetween', () => {
  it('should return valid number of working days between passed dates', () => {
    const dateA = new Date('2021-07-01')
    const dateB = new Date('2021-07-12')

    const result = getNumberOfWorkingDaysBetween(dateA, dateB)
    expect(result).toBe(8)
  })
})
