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

export const displayDayLong = (date: DateTime, language: string) =>
  date.setLocale(language).toFormat('d LLLL y')

export const displayDatesRange = (startDate: string, endDate: string, language: string) => {
  const startDateConverted = DateTime.fromISO(startDate)
  const endDateConverted = DateTime.fromISO(endDate)

  // 1.if different year: 20 December 2020 - 7 January2021
  if (startDateConverted.get('year') !== endDateConverted.get('year')) {
    return `${displayDayLong(startDateConverted, language)}-${displayDayLong(
      endDateConverted,
      language
    )}`
  }

  // 2.if the same year but different month: 20 May -16 June 2021
  if (startDateConverted.get('month') !== endDateConverted.get('month')) {
    return `${displayDayShort(startDateConverted, language)}-${displayDayLong(
      endDateConverted,
      language
    )}`
  }
  // 3.if the same month but different day: 12-16 June 2021
  if (startDateConverted.get('day') !== endDateConverted.get('day')) {
    return `${startDateConverted.get('day')}-${displayDayLong(endDateConverted, language)}`
  }
  // 4.if the same day (one day off): 16 June 2021
  return displayDayLong(startDateConverted, language)
}

export const setDateToBeDisplayed = (date: string, currentlyOnHoliday: boolean) => {
  const convertedDate = DateTime.fromISO(date)
  return currentlyOnHoliday ? convertedDate.plus({ days: 1 }) : convertedDate.minus({ days: 1 })
}

// SUM FUNCTIONS

// function to count how many people are on holidays in team
export const qtyOnHolidayNow = (users: MateHolidaysData[]): number =>
  users.reduce(
    (acc, curr) =>
      !curr.holidays || (curr.holidays && !curr.holidays.isOnHoliday) ? acc : acc + 1,
    0
  )
