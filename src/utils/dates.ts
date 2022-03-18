import {
  addDays,
  compareAsc,
  differenceInBusinessDays,
  format,
  getDay,
  isSameMonth,
  isSameYear,
  parseISO as FNSParseISO,
  setMonth,
} from 'date-fns'
import { getHolidaysInYear } from 'poland-public-holidays'
import { getCurrentLocale } from './locale'

export type DateOrISO = Date | string

export const parseISO = (date: DateOrISO) => (date instanceof Date ? date : FNSParseISO(date))

export const formatFromISO = (date: DateOrISO, dateFormat: string) =>
  format(parseISO(date), dateFormat, { locale: getCurrentLocale() })

export const getDayName = (date: DateOrISO): string => formatFromISO(date, 'cccc')

export const getDateWithMonthString = (date: DateOrISO): string => formatFromISO(date, 'd MMMM y')
export const getISODateString = (date: DateOrISO): string => formatFromISO(date, 'yyyy-MM-dd')

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

  if (compareAsc(nextDate, end) === 0) dates.push(formatFromISO(nextDate, 'yyyy-MM-dd'))
  for (let i = 0; compareAsc(nextDate, end) < 0; i++) {
    nextDate = addDays(start, i)
    dates.push(formatFromISO(nextDate, 'yyyy-MM-dd'))
  }

  return dates
}

export const getFormattedPeriod = (
  dateA?: DateOrISO,
  dateB?: DateOrISO,
  format: 'short' | 'long' = 'short'
) => {
  if (!dateA || !dateB) return ''

  const parsedDateA = parseISO(dateA)
  const parsedDateB = parseISO(dateB)

  let a
  let b
  if (format === 'short') {
    a = formatFromISO(parsedDateA, 'd MMM')
    b = formatFromISO(parsedDateB, 'd MMM')
  } else if (format === 'long' && isSameMonth(parsedDateA, parsedDateB)) {
    a = formatFromISO(parsedDateA, 'd')
    b = formatFromISO(parsedDateB, 'd MMMM yyyy')
  } else if (
    format === 'long' &&
    !isSameMonth(parsedDateA, parsedDateB) &&
    isSameYear(parsedDateA, parsedDateB)
  ) {
    a = formatFromISO(parsedDateA, 'd MMMM')
    b = formatFromISO(parsedDateB, 'd MMMM yyyy')
  } else {
    a = formatFromISO(parsedDateA, 'd MMMM yyyy')
    b = formatFromISO(parsedDateB, 'd MMMM yyyy')
  }

  if (parsedDateA.toISOString() === parsedDateB.toISOString()) return b

  return `${a} - ${b}`
}

export const getNumberOfWorkingDaysBetween = (dateA: DateOrISO, dateB: DateOrISO) => {
  const startDate = parseISO(dateA)
  const endDate = parseISO(dateB)

  return differenceInBusinessDays(endDate, startDate) + 1
}

// TODO: add tests for calculatePTO
export const calculatePTO = (start: DateOrISO, end: DateOrISO) => {
  const startDate = parseISO(start)
  const endDate = parseISO(end)
  const daysDiff = Math.floor((endDate.getTime() - startDate.getTime()) / DAY_IN_MS)
  const holidays = getHolidaysInYear(startDate.getFullYear())
  let workdaysDiff = 0
  for (let i = 0; i < daysDiff; i++) {
    const date = new Date(startDate.getTime() + i * DAY_IN_MS)
    // eslint-disable-next-line no-continue
    if (date.getDay() === 6 || date.getDay() === 0) continue
    for (const holiday of holidays) {
      // eslint-disable-next-line no-continue
      if (holiday.date === date) continue
    }
    workdaysDiff++
  }
  return workdaysDiff
}

const DAY_IN_MS = 1000 * 60 * 60 * 24
