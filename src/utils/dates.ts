import { DateTime } from 'luxon'

export const isWeekend = (date: DateTime): boolean => date.weekday === 6 || date.weekday === 7

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

export const getDayName = (ISOString: string, language: string): string =>
  DateTime.fromISO(ISOString).setLocale(language).weekdayLong

export const getDateWithMonthString = (ISOString: string, language: string): string =>
  DateTime.fromISO(ISOString).setLocale(language).toFormat('dd LLLL yyyy')

export const getFormattedPeriod = (dateA?: Date, dateB?: Date, language?: string) => {
  if (!dateA || !dateB) return ''
  const a = `${dateA.getDate()} ${getMonthName(dateA.getMonth() + 1, language || '').slice(0, 3)}`
  const b = `${dateB.getDate()} ${getMonthName(dateB.getMonth() + 1, language || '').slice(0, 3)}`
  if (dateA.toISOString() === dateB.toISOString()) return a
  return `${a} - ${b}`
}
