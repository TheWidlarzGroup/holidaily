import { companyDaysOff, ValidationOfCompanyDayOff } from 'screens/dashboard/temporaryData'

const usersHolidays: ValidationOfCompanyDayOff[] = companyDaysOff

export const dataToBeDisplayed = (language: string): ValidationOfDataToBeDisplayed[] => {
  const today: Date = new Date()
  return usersHolidays.map((item) => {
    if (item.isOnHoliday) {
      const backDate: Date = new Date(item.dayEnd)
      backDate.setUTCDate(backDate.getUTCDate() + 1)
      return backDate.getUTCDate() < today.getUTCDate() + 7
        ? { ...item, dayToBeDisplayed: backDate.toLocaleDateString(language, { weekday: 'long' }) }
        : {
            ...item,
            dayToBeDisplayed: backDate.toLocaleDateString(language, {
              day: 'numeric',
              month: 'long',
            }),
          }
    }
    const lastWorkDate: Date = new Date(item.dayStart)
    lastWorkDate.setUTCDate(lastWorkDate.getUTCDate() - 1)
    return lastWorkDate.getUTCDate() < today.getUTCDate() + 7
      ? {
          ...item,
          dayToBeDisplayed: lastWorkDate.toLocaleDateString(language, { weekday: 'long' }),
        }
      : {
          ...item,
          dayToBeDisplayed: lastWorkDate.toLocaleDateString(language, {
            day: 'numeric',
            month: 'long',
          }),
        }
  })
}

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
