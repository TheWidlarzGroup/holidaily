import { COMPANY_DAYS_OFF, ValidationOfCompanyDayOff } from 'screens/dashboard/temporaryData'
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

export const dataToBeDisplayed = (language: string): ValidationOfDataToBeDisplayed[] => {
  const today = DateTime.now()
  return USER_HOLIDAYS.map((item) => {
    if (item.isOnHoliday) {
      const lastDayOff = DateTime.fromISO(item.dayEnd)
      const backDay = lastDayOff.plus({ days: 1 })
      return backDay < today.plus({ days: 7 })
        ? { ...item, dayToBeDisplayed: backDay.setLocale(language).toFormat('cccc') }
        : {
            ...item,
            dayToBeDisplayed: backDay.setLocale(language).toFormat('d LLLL'),
          }
    }
    const firstDayOff = DateTime.fromISO(item.dayStart)
    const lastWorkDay = firstDayOff.minus({ days: 1 })
    return lastWorkDay < today.plus({ days: 7 })
      ? {
          ...item,
          dayToBeDisplayed: lastWorkDay.setLocale(language).toFormat('cccc'),
        }
      : {
          ...item,
          dayToBeDisplayed: lastWorkDay.setLocale(language).toFormat('d LLLL'),
        }
  })
}
