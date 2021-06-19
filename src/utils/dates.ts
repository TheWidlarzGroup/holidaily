import { DateTime } from 'luxon'

export const isWeekend = (date: DateTime | undefined): boolean =>
  date?.weekday === 6 || date?.weekday === 7

const getWeekDaysFromSunday = (language: string): string[] => {
  const date = DateTime.now().setLocale(language)
  const weekDays = new Array(7)
  for (let i = 0; i < weekDays.length; i++)
    weekDays[i] = date.set({ weekday: i }).get('weekdayLong')
  return weekDays
}

export const getShortWeekDays = (language: string): string[] =>
  getWeekDaysFromSunday(language).map((day) => (day ? day.charAt(0) : ''))

export const getMonthName = (monthNumber: number, language: string): string =>
  DateTime.now().setLocale(language).set({ month: monthNumber }).monthLong

export const getDatesBetween = (ISOStringStart: string, ISOStringEnd: string) => {
  const start = DateTime.fromISO(ISOStringStart)
  const end = DateTime.fromISO(ISOStringEnd)
  const dates: string[] = []

  for (let i = 0; start.plus({ days: i }).toISODate() <= end.toISODate(); i++) {
    dates.push(start.plus({ days: i }).toISODate())
  }

  return dates
}
