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
