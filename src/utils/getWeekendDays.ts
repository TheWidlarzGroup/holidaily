import { eachDayOfInterval, lastDayOfMonth } from 'date-fns'
import { DayInfoProps } from 'types/DayInfoProps'
import { getISODateString, isWeekend } from './dates'

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
