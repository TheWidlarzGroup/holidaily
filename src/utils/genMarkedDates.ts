import { getHolidaysInYear } from 'poland-public-holidays'
import { getDatesBetween } from './dates'

type MarkedDateType = {
  selected?: boolean
  color?: string
  endingDay?: boolean
  startingDay?: boolean
  period?: boolean
}

export const genMarkedDates = (start?: string, end?: string) => {
  if (!start || !end) return {}
  const obj: { [key: string]: MarkedDateType } = {}
  const dates = getDatesBetween(start, end)
  const holidays = getHolidaysInYear(new Date(start)).map((holiday) => holiday.date)
  const isHoliday = (date: Date) =>
    !holidays.some((holiday) => holiday.toDateString() === date.toDateString())
  dates.forEach((date) => {
    obj[date] = {
      period: isHoliday(new Date(date)),
    }
  })

  if (obj?.[dates?.[0]]) obj[dates[0]].startingDay = true
  if (obj?.[dates?.[dates?.length - 1]]) obj[dates[dates.length - 1]].endingDay = true
  return obj
}
