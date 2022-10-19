import {
  addDays,
  compareAsc,
  differenceInBusinessDays,
  format,
  formatDuration,
  getDay,
  isSameDay,
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

export const getDateWithShortMonthString = (date: DateOrISO): string =>
  formatFromISO(date, 'd MMM y')
export const getReversedDateWithShortMonthString = (date: DateOrISO): string =>
  formatFromISO(date, 'y, d MMM')

export const getDateWithMonthString = (date: DateOrISO): string => formatFromISO(date, 'd MMMM y')
export const getReversedDateWithMonthString = (date: DateOrISO): string =>
  formatFromISO(date, 'y, d MMMM')

export const getISODateString = (date: DateOrISO): string => formatFromISO(date, 'yyyy-MM-dd')
export const getISOMonthYearString = (date: DateOrISO): string => formatFromISO(date, 'yyyy-MM')

export const getMonthName = (monthNumber: number): string =>
  formatFromISO(setMonth(new Date(), monthNumber), 'LLLL')

export const isWeekend = (date: DateOrISO): boolean => {
  const parsedDate = parseISO(date)
  return getDay(parsedDate) === 6 || getDay(parsedDate) === 0
}

export const isToday = (date: DateOrISO): boolean => {
  const parsedDate = parseISO(date)
  return isSameDay(parsedDate, new Date())
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
  format: 'short' | 'long' | 'shortMonths' = 'short'
) => {
  if (!dateA || !dateB) return ''

  const parsedDateA = parseISO(dateA)
  const parsedDateB = parseISO(dateB)

  let a
  let b
  if (format === 'short') {
    a = formatFromISO(parsedDateA, 'd MMM')
    b = formatFromISO(parsedDateB, 'd MMM')
  } else if (format === 'shortMonths' && isSameMonth(parsedDateA, parsedDateB)) {
    a = formatFromISO(parsedDateA, 'd')
    b = formatFromISO(parsedDateB, 'd MMM yyyy')
  } else if (
    format === 'shortMonths' &&
    !isSameMonth(parsedDateA, parsedDateB) &&
    isSameYear(parsedDateA, parsedDateB)
  ) {
    a = formatFromISO(parsedDateA, 'd MMM')
    b = formatFromISO(parsedDateB, 'd MMM yyyy')
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

export const getReversedFormattedPeriod = (
  dateA?: DateOrISO,
  dateB?: DateOrISO,
  format: 'short' | 'long' | 'shortMonths' = 'short'
) => {
  if (!dateA || !dateB) return ''

  const parsedDateA = parseISO(dateA)
  const parsedDateB = parseISO(dateB)

  let a
  let b
  if (format === 'short') {
    a = formatFromISO(parsedDateA, 'd MMM')
    b = formatFromISO(parsedDateB, 'd MMM')
  } else if (format === 'shortMonths' && isSameMonth(parsedDateA, parsedDateB)) {
    a = formatFromISO(parsedDateA, 'yyyy, d')
    b = formatFromISO(parsedDateB, 'd MMM')
  } else if (
    format === 'shortMonths' &&
    !isSameMonth(parsedDateA, parsedDateB) &&
    isSameYear(parsedDateA, parsedDateB)
  ) {
    a = formatFromISO(parsedDateA, 'yyyy, d MMM')
    b = formatFromISO(parsedDateB, 'd MMM')
  } else if (format === 'long' && isSameMonth(parsedDateA, parsedDateB)) {
    a = formatFromISO(parsedDateA, 'yyyy, d')
    b = formatFromISO(parsedDateB, 'd MMMM')
  } else if (
    format === 'long' &&
    !isSameMonth(parsedDateA, parsedDateB) &&
    isSameYear(parsedDateA, parsedDateB)
  ) {
    a = formatFromISO(parsedDateA, 'yyyy, d MMMM')
    b = formatFromISO(parsedDateB, 'd MMMM')
  } else {
    a = formatFromISO(parsedDateA, 'yyyy, d MMMM')
    b = formatFromISO(parsedDateB, 'yyyy, d MMMM')
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
  startDate.setHours(0, 0, 0, 0)
  endDate.setHours(23, 59, 59, 999)
  const daysDiff = Math.floor((endDate.getTime() - startDate.getTime()) / DAY_IN_MS)
  const holidays = getHolidaysInYear(startDate.getFullYear())
  let workdaysDiff = 0
  for (let i = 0; i <= daysDiff; i++) {
    const date = new Date(startDate.getTime() + i * DAY_IN_MS)
    const isNotWeekend = !(date.getDay() === 6) && !(date.getDay() === 0)
    if (isNotWeekend) {
      let isNotHoliday = true
      for (const holiday of holidays) {
        if (holiday.date.toDateString() === date.toDateString()) isNotHoliday = false
      }
      if (isNotHoliday) workdaysDiff++
    }
  }
  return workdaysDiff
}

export const getDurationInDays = (days: number) =>
  formatDuration({ days }, { locale: getCurrentLocale(), zero: true })

export const isDateBetween = (
  date: Date | number | string,
  rangeStart: Date | number | string,
  rangeEnd: Date | number | string
) => {
  if (!(date instanceof Date)) date = new Date(date)
  if (!(rangeStart instanceof Date)) rangeStart = new Date(rangeStart)
  if (!(rangeEnd instanceof Date)) rangeEnd = new Date(rangeEnd)
  rangeStart.setHours(0, 0, 0, 0)
  rangeEnd.setHours(23, 59, 59, 999)
  return date.getTime() >= rangeStart.getTime() && date.getTime() <= rangeEnd.getTime()
}

const DAY_IN_MS = 1000 * 60 * 60 * 24
