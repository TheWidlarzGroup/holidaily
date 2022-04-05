import { eachDayOfInterval, format } from 'date-fns'
import { useTeamsContext } from 'hooks/usePostsContext'
import { DayInfoProps } from 'screens/calendar/components/DayInfo'
import { getISODateString, getISOMonthYearString } from 'utils/dates'

type MonthType = {
  date: string
  days: DayInfoProps[]
}

export const useGetRangeDates = (startDate: string, endDate: string) => {
  const { teams } = useTeamsContext()
  const datesList = eachDayOfInterval({ start: new Date(startDate), end: new Date(endDate) })
  const allMonths: MonthType[] = []
  let daysInMonth: DayInfoProps[] = []
  let monthDate = ''

  datesList.map((date) => {
    const dayOfMonth = format(date, 'd')
    if (dayOfMonth === '1') {
      if (daysInMonth.length > 0) {
        allMonths.push({
          date: monthDate,
          days: daysInMonth,
        })
      }
      daysInMonth = []
    }
    const dayOfWeek = format(date, 'e')
    monthDate = getISOMonthYearString(date)
    if (dayOfWeek === '6') {
      return daysInMonth.push({ date: getISODateString(date), weekend: 1 })
    }
    if (dayOfWeek === '7') {
      return daysInMonth.push({ date: getISODateString(date), weekend: 2 })
    }
    return daysInMonth.push({ date: getISODateString(date) })
  })
  return { allMonths }
}
