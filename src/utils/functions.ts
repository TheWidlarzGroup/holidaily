import { addDays, getDate, getMonth, getYear, subDays } from 'date-fns'
import { User } from 'mock-api/models/mirageTypes'
import { DateOrISO, formatFromISO, parseISO } from './dates'

export type ValidationOfDataToBeDisplayed = {
  isOnHoliday: boolean
  id: number
  startDate: string
  endDate: string
  user: {
    id: string
    firstName: string
    lastName: string
  }
  dayToBeDisplayed: string
}

// COMPARE DATE FUNCTIONS
export const isTimeIntervalLessThanWeek = (date: DateOrISO): boolean => {
  const formattedDate = parseISO(date)
  const today = Date.now()
  return formattedDate < addDays(today, 7) && formattedDate > subDays(today, 7)
}

// DISPLAY DATE FUNCTIONS

export const displayWeekday = (date: DateOrISO) => formatFromISO(date, 'cccc')

export const displayDayShort = (date: DateOrISO) => formatFromISO(date, 'd MMMM')

export const displayDayLong = (date: DateOrISO) => formatFromISO(date, 'd MMMM y')

export const displayDDMonYYYY = (date: DateOrISO) => formatFromISO(date, 'dd MMM y')

export const displayDatesRange = (startDate: DateOrISO, endDate: DateOrISO) => {
  const startDateConverted = parseISO(startDate)
  const endDateConverted = parseISO(endDate)

  // 1.if different year: 20 December 2020 - 7 January2021
  if (getYear(startDateConverted) !== getYear(endDateConverted)) {
    return `${displayDayLong(startDate)} - ${displayDayLong(endDate)}`
  }

  // 2.if the same year but different month: 20 May -16 June 2021
  if (getMonth(startDateConverted) !== getMonth(endDateConverted)) {
    return `${displayDayShort(startDate)} - ${displayDayLong(endDate)}`
  }
  // 3.if the same month but different day: 12-16 June 2021
  if (getDate(startDateConverted) !== getDate(endDateConverted)) {
    return `${getDate(startDateConverted)} - ${displayDayLong(endDateConverted)}`
  }
  // 4.if the same day (one day off): 16 June 2021
  return displayDayLong(startDate)
}

export const setDateToBeDisplayed = (date: DateOrISO, currentlyOnHoliday: boolean) => {
  const parsedDate = parseISO(date)
  return currentlyOnHoliday ? addDays(parsedDate, 1) : subDays(parsedDate, 1)
}

// SUM FUNCTIONS

// function to count how many people are on holidays in team
export const qtyOnHolidayNow = (users: User[]): number =>
  users.reduce(
    (acc, curr) => (!curr.requests[0] || (curr.requests[0] && !curr.isOnHoliday) ? acc : acc + 1),
    0
  )
