import { COMPANY_DAYS_OFF } from 'screens/dashboard/helpers/temporaryData'
import { ValidationOfCompanyDayOff } from 'types/holidaysDataTypes'
import {
  isTimeIntervalLessThanWeek,
  displayWeekday,
  displayDayShort,
  setDateToBeDisplayed,
} from 'utils/functions'

export type ValidationOfDataToBeDisplayed = ValidationOfCompanyDayOff & {
  dayToBeDisplayed: string
}

const USER_HOLIDAYS: ValidationOfCompanyDayOff[] = COMPANY_DAYS_OFF

export const dataToBeDisplayed = (): ValidationOfDataToBeDisplayed[] =>
  USER_HOLIDAYS.map((item) => {
    const dateToBeDisplay = item.isOnHoliday
      ? setDateToBeDisplayed(item.dayEnd, true)
      : setDateToBeDisplayed(item.dayStart, false)

    return isTimeIntervalLessThanWeek(dateToBeDisplay)
      ? { ...item, dayToBeDisplayed: displayWeekday(dateToBeDisplay) }
      : {
          ...item,
          dayToBeDisplayed: displayDayShort(dateToBeDisplay),
        }
  })
