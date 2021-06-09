import {
  COMPANY_DAYS_OFF,
  USER_GROUPS_DAYS_OFF,
  ValidationOfCompanyDayOff,
  ValidationOfGroupDayOff,
} from 'screens/dashboard/temporaryData'
import { DateTime } from 'luxon'

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

const USER_HOLIDAYS: ValidationOfCompanyDayOff[] = COMPANY_DAYS_OFF

const isTimeIntervalLessThanWeek = (date: DateTime): boolean => {
  const today = DateTime.now()
  return date < today.plus({ days: 7 })
}

const displayWeekday = (date: DateTime, language: string) =>
  date.setLocale(language).toFormat('cccc')

const displayDayShort = (date: DateTime, language: string) =>
  date.setLocale(language).toFormat('d LLLL')

const setDateToBeDisplayed = (date: string, currentluOnHoliday: boolean) => {
  const convertedDate = DateTime.fromISO(date)
  return currentluOnHoliday ? convertedDate.plus({ days: 1 }) : convertedDate.minus({ days: 1 })
}

export const dataToBeDisplayed = (language: string): ValidationOfDataToBeDisplayed[] =>
  USER_HOLIDAYS.map((item) => {
    const dateToBeDisplay = item.isOnHoliday
      ? setDateToBeDisplayed(item.dayEnd, true)
      : setDateToBeDisplayed(item.dayStart, false)
    return isTimeIntervalLessThanWeek(dateToBeDisplay)
      ? { ...item, dayToBeDisplayed: displayWeekday(dateToBeDisplay, language) }
      : {
          ...item,
          dayToBeDisplayed: displayDayShort(dateToBeDisplay, language),
        }
  })

export const qtyOnHolidayNow = (id: number): number | string => {
  type GroupType = ValidationOfGroupDayOff | undefined
  const group: GroupType = USER_GROUPS_DAYS_OFF.find((e) => e.groupId === id)
  if (group === undefined) return 'x'
  return group.users.reduce(
    (acc, curr) =>
      !curr.holidays || (curr.holidays && !curr.holidays.isOnHoliday) ? acc : acc + 1,
    0
  )
}
