import { COMPANY_DAYS_OFF } from 'screens/dashboard/helpers/temporaryData'
import { ValidationOfCompanyDayOff } from 'types/holidaysDataTypes'
import {
  isTimeIntervalLessThanWeek,
  displayWeekday,
  displayDayShort,
  setDateToBeDisplayed,
} from 'utils/functions'

export type ValidationOfDataToBeDisplayed = {
  isOnHoliday: boolean
  id: number
  dayStart: string
  dayEnd: string
  user: {
    id: string
    firstName: string
    lastName: string
    picture?: string
  }
  dayToBeDisplayed: string
}

const USER_HOLIDAYS: ValidationOfCompanyDayOff[] = COMPANY_DAYS_OFF

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
