import {
  addDays,
  compareAsc,
  format,
  getDay,
  getMonth,
  parseISO as FNSParseISO,
  setMonth,
} from 'date-fns'
import { mapLanguageToLocale } from './languageToLocaleMap'

export type DateOrISO = Date | string

export const parseISO = (date: DateOrISO) => (date instanceof Date ? date : FNSParseISO(date))

export const formatFromISO = (date: DateOrISO, dateFormat: string) =>
  format(parseISO(date), dateFormat, { locale: mapLanguageToLocale() })

export const getDayName = (date: DateOrISO): string => formatFromISO(date, 'cccc')

export const getDateWithMonthString = (date: DateOrISO): string => formatFromISO(date, 'd MMMM y')

export const getMonthName = (monthNumber: number): string =>
  formatFromISO(setMonth(new Date(), monthNumber), 'LLLL')

export const isWeekend = (date: DateOrISO): boolean => {
  const parsedDate = parseISO(date)
  return getDay(parsedDate) === 6 || getDay(parsedDate) === 0
}

const getWeekDaysFromSunday = (): string[] => {
  const today = new Date()
  const weekDays = new Array(7)
  for (let i = 0; i < weekDays.length; i++) weekDays[i] = getDayName(addDays(today, i))
  return weekDays
}

export const getShortWeekDays = (): string[] =>
  getWeekDaysFromSunday().map((day) => (day ? day.charAt(0) : ''))

export const getDatesBetween = (startDate: DateOrISO, endDate: DateOrISO) => {
  const start = parseISO(startDate)
  const end = parseISO(endDate)
  const dates: string[] = []

  let nextDate = start

  for (let i = 0; compareAsc(nextDate, end) <= 0; i++) {
    nextDate = addDays(start, i)
    dates.push(nextDate.toISOString())
  }

  return dates
}

export const getFormattedPeriod = (dateA?: DateOrISO, dateB?: DateOrISO) => {
  if (!dateA || !dateB) return ''

  const parsedDateA = parseISO(dateA)
  const parsedDateB = parseISO(dateB)

  const a = `${parsedDateA} ${getMonthName(getMonth(parsedDateA)).slice(0, 3)}`
  const b = `${parsedDateB} ${getMonthName(getMonth(parsedDateB)).slice(0, 3)}`

  if (parsedDateA.toISOString() === parsedDateB.toISOString()) return a

  return `${a} - ${b}`
}
