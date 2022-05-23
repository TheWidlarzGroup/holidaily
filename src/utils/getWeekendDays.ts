import { eachDayOfInterval, lastDayOfMonth } from 'date-fns'
import { DayInfoProps } from 'types/DayInfoProps'
import { getISODateString, isWeekend } from './dates'

export const getWeekendDays = (months: string[]) =>
  months.map((month) => {
    const firstMonthDay = new Date(`${month}-01`)
    const eachDayOfMonth = eachDayOfInterval({
      start: new Date(firstMonthDay),
      end: new Date(lastDayOfMonth(firstMonthDay)),
    })

    const days: DayInfoProps[] = []
    eachDayOfMonth.forEach((day) => {
      if (isWeekend(day)) {
        days.push({ date: getISODateString(day) })
      }
    })
    return {
      date: month,
      days,
    }
  })
