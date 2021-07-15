import {
  addDays,
  compareAsc,
  format,
  getDay,
  getMonth,
  parseISO as FNSParseISO,
  setMonth,
} from 'date-fns'
import { getCurrentLocale } from './locale'

export type DateOrISO = Date | string

export const parseISO = (date: DateOrISO) => (date instanceof Date ? date : FNSParseISO(date))

export const formatFromISO = (date: DateOrISO, dateFormat: string) =>
  format(parseISO(date), dateFormat, { locale: getCurrentLocale() })

export const getDayName = (date: DateOrISO): string => formatFromISO(date, 'cccc')

export const getDateWithMonthString = (date: DateOrISO): string => formatFromISO(date, 'd MMMM y')

export const getMonthName = (monthNumber: number): string =>
  formatFromISO(setMonth(new Date(), monthNumber), 'LLLL')

export const isWeekend = (date: DateOrISO): boolean => {
  const parsedDate = parseISO(date)
  return getDay(parsedDate) === 6 || getDay(parsedDate) === 0
}

const getWeekDaysFromSunday = (): string[] => {
  const locale = getCurrentLocale()
  return [0, 1, 2, 3, 4, 5, 6].map((i) => locale.localize?.day(i))
}

export const getShortWeekDays = (): string[] =>
  getWeekDaysFromSunday().map((day) => (day ? day.charAt(0).toLocaleUpperCase() : ''))

export const getDatesBetween = (startDate: DateOrISO, endDate: DateOrISO) => {
  const start = parseISO(startDate)
  const end = parseISO(endDate)
  const dates: string[] = []

  let nextDate = start

  for (let i = 0; compareAsc(nextDate, end) < 0; i++) {
    nextDate = addDays(start, i)
    dates.push(formatFromISO(nextDate, 'yyyy-MM-dd'))
  }

  return dates
}

export const getFormattedPeriod = (dateA?: DateOrISO, dateB?: DateOrISO) => {
  if (!dateA || !dateB) return ''

  const parsedDateA = parseISO(dateA)
  const parsedDateB = parseISO(dateB)

  const a = `${formatFromISO(parsedDateA, 'd')} ${getMonthName(getMonth(parsedDateA)).slice(0, 3)}`
  const b = `${formatFromISO(parsedDateB, 'd')} ${getMonthName(getMonth(parsedDateB)).slice(0, 3)}`

  if (parsedDateA.toISOString() === parsedDateB.toISOString()) return a

  return `${a} - ${b}`
}
