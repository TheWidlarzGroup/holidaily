import { eachDayOfInterval, lastDayOfMonth } from 'date-fns'
import { DayInfoProps } from 'types/DayInfoProps'
import { getISODateString, isWeekend } from './dates'

export const getWeekendDays = (months: string[]) =>
  months.map((month) => {
    const firstDayOfMonth = new Date(`${month}-01`)
    const days = eachWeekendDaysOfMonth(firstDayOfMonth)
    return {
      date: month,
      days,
    }
  })

export const eachWeekendDaysOfMonth = (firstDayOfMonth: Date) => {
  const eachDayOfMonth = eachDayOfInterval({
    start: new Date(firstDayOfMonth),
    end: new Date(lastDayOfMonth(firstDayOfMonth)),
  })

  const days: DayInfoProps[] = []
  eachDayOfMonth.forEach((day) => {
    if (isWeekend(day)) {
      days.push({ date: getISODateString(day) })
    }
  })
  return days
}
