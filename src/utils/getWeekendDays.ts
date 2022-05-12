import { eachDayOfInterval, lastDayOfMonth } from 'date-fns'
import { DayInfoProps } from 'screens/calendar/components/DayInfo'
import { getISODateString } from './dates'

export const getWeekendDays = (months: string[]) =>
  months.map((month) => {
    const firstMonthDay = new Date(`${month}-01`)
    const eachDayOfMonth = eachDayOfInterval({
      start: new Date(firstMonthDay),
      end: new Date(lastDayOfMonth(firstMonthDay)),
    })

    const days: DayInfoProps[] = []
    eachDayOfMonth.forEach((day) => {
      if (day.getDay() === 0 || day.getDay() === 6) {
        days.push({ date: getISODateString(day) })
      }
    })
    return {
      date: month,
      days,
    }
  })
