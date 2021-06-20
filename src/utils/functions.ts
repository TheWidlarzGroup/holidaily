import { DateTime } from 'luxon'
import { MateHolidaysData } from 'types/holidaysDataTypes'

export type ValidationOfDataToBeDisplayed = {
  isOnHoliday: boolean
  id: number
  dayStart: string
  dayEnd: string
  user: {
    id: string
    firstName: string
    lastName: string
  }
  dayToBeDisplayed: string
}

// DATE FUNCTIONS

export const isTimeIntervalLessThanWeek = (date: DateTime): boolean => {
  const today = DateTime.now()
  return date < today.plus({ days: 7 }) && date > today.minus({ days: 7 })
}

export const displayWeekday = (date: DateTime, language: string) =>
  date.setLocale(language).toFormat('cccc')

export const displayDayShort = (date: DateTime, language: string) =>
  date.setLocale(language).toFormat('d LLLL')

export const setDateToBeDisplayed = (date: string, currentlyOnHoliday: boolean) => {
  const convertedDate = DateTime.fromISO(date)
  return currentlyOnHoliday ? convertedDate.plus({ days: 1 }) : convertedDate.minus({ days: 1 })
}

export const displayDDMonYYYY = (date: DateTime, language: string) =>
  date.setLocale(language).toFormat('dd LLL yyyy')

// SUM FUNCTIONS

// function to count how many people are on holidays in team
export const qtyOnHolidayNow = (users: MateHolidaysData[]): number =>
  users.reduce(
    (acc, curr) =>
      !curr.holidays || (curr.holidays && !curr.holidays.isOnHoliday) ? acc : acc + 1,
    0
  )
