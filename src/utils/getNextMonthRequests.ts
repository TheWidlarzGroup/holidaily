import { add, parseISO } from 'date-fns'
import { HolidailyRequestMonthType } from 'types/HolidayRequestMonthType'

export const getNextMonthRequests = (
  singleMonthRequests: HolidailyRequestMonthType[],
  currentDate: Date
) => {
  const allNextMonthRequests = singleMonthRequests.find((month) => {
    const thisMonth = parseISO(month.date)
    const nextMonth = add(currentDate, { months: 1 })
    return (
      thisMonth.getMonth() === nextMonth.getMonth() &&
      thisMonth.getFullYear() === nextMonth.getFullYear()
    )
  })
  return allNextMonthRequests
}
