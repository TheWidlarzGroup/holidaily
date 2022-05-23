import { HolidailyRequestMonthType } from 'types/HolidayRequestMonthType'
import { isWeekend } from './dates'

export const getFirstRequestsOfMonth = (allRequestsOfMonth: HolidailyRequestMonthType) => {
  const firstDaysOfNextMonthRequests = allRequestsOfMonth?.days.filter((day) => {
    if (isWeekend(day.date)) return
    return (
      day.date.slice(-2) === '01' ||
      day.date.slice(-2) === '02' ||
      day.date.slice(-2) === '03' ||
      day.date.slice(-2) === '04'
    )
  })
  return firstDaysOfNextMonthRequests
}
