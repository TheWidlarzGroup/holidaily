import { getMonthName, isWeekend } from 'utils/dates'
import { DateTime } from 'luxon'

describe('checksIfItsWeekend', () => {
  const monday = DateTime.fromISO('2021-06-07')
  const tuesday = DateTime.fromISO('2021-06-08')
  const wednesday = DateTime.fromISO('2021-06-09')
  const thursday = DateTime.fromISO('2021-06-10')
  const friday = DateTime.fromISO('2021-06-11')
  const saturday = DateTime.fromISO('2021-06-12')
  const sunday = DateTime.fromISO('2021-06-13')
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
  it('get proper month name from number', () => {
    expect(getMonthName(1, 'en')).toBe('January')
    expect(getMonthName(1, 'pl')).toBe('styczeń')
  })
})
