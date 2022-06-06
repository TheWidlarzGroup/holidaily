import {
  add,
  eachDayOfInterval,
  eachMonthOfInterval,
  format,
  lastDayOfMonth,
  startOfMonth,
  sub,
} from 'date-fns'
import { DayInfoProps } from 'types/DayInfoProps'
import { HolidailyRequestMonthType } from 'types/HolidayRequestMonthType'
import { getISODateString } from 'utils/dates'

export const getMonthsWithoutRequests = () => {
  const endDate = add(new Date(), { months: 12 })
  const startDate = sub(new Date(), { months: 12 })
  const eachMonthBetweenDates = eachMonthOfInterval({
    start: startDate,
    end: endDate,
  })

  const allMonths: HolidailyRequestMonthType[] = []
  eachMonthBetweenDates.forEach((month) => {
    const singleMonthDaysEvents: DayInfoProps[] = []

    const eachDayOfMonth = eachDayOfInterval({
      start: startOfMonth(month),
      end: lastDayOfMonth(month),
    })
    eachDayOfMonth.forEach((day) => {
      singleMonthDaysEvents.push({ date: getISODateString(day), events: [] })
    })

    const singleMonth = {
      date: format(month, 'yyyy-MM'),
      days: singleMonthDaysEvents,
    }
    allMonths.push(singleMonth)
  })
  return allMonths
}
