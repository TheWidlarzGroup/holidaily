import { add, parseISO } from 'date-fns'
import { HolidayRequestMonthType } from 'types/HolidayRequestMonthType'

export const getNextMonthRequests = (
  singleMonthRequests: HolidayRequestMonthType[],
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
