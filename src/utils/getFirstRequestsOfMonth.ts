import { HolidailyRequestMonthType } from 'types/HolidayRequestMonthType'

export const getFirstRequestsOfMonth = (allRequestsOfMonth: HolidailyRequestMonthType) => {
  const firstDaysOfNextMonthRequests = allRequestsOfMonth?.days.filter((day) => {
    if (new Date(day.date).getDay() === 6 || new Date(day.date).getDay() === 0) return
    return (
      day.date.slice(-2) === '01' ||
      day.date.slice(-2) === '02' ||
      day.date.slice(-2) === '03' ||
      day.date.slice(-2) === '04'
    )
  })
  return firstDaysOfNextMonthRequests
}
