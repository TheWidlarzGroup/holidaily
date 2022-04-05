import { eachDayOfInterval, format } from 'date-fns'
import { useTeamsContext } from 'hooks/useTeamsContext'
import { DayInfoProps } from 'screens/calendar/components/DayInfo'
import { getISODateString, getISOMonthYearString } from 'utils/dates'
import { generateUUID } from 'utils/generateUUID'

type MonthType = {
  date: string
  days: DayInfoProps[]
}

export const useGetRangeDates = (startDate: string, endDate: string) => {
  const { teams } = useTeamsContext()

  const getAllDaysOfHolidayRequests = () => {
    const allRequests = []
    teams?.forEach((team) => {
      team.users.forEach((user) => {
        user.requests.forEach((request) => {
          const dates = eachDayOfInterval({
            start: new Date(request.startDate),
            end: new Date(request.endDate),
          })
          dates.forEach((date) => {
            const req = {
              id: generateUUID(),
              person: `${user.firstName} ${user.lastName}`,
              reason: request.description,
              position: user.occupation,
              color: user.userColor,
              categoryId: 1,
              date: getISODateString(date),
            }
            allRequests.push(req)
          })
        })
      })
    })
    return { allRequests }
  }

  const { allRequests } = getAllDaysOfHolidayRequests()

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
    const requests = allRequests.filter((req) => req.date === getISODateString(date))
    console.log(requests)
    const dayOfWeek = format(date, 'e')
    monthDate = getISOMonthYearString(date)
    if (dayOfWeek === '6') {
      return daysInMonth.push({
        date: getISODateString(date),
        weekend: 1,
        events: requests.length > 0 ? requests : undefined,
      })
    }
    if (dayOfWeek === '7') {
      return daysInMonth.push({
        date: getISODateString(date),
        weekend: 2,
        events: requests.length > 0 ? requests : undefined,
      })
    }
    return daysInMonth.push({
      date: getISODateString(date),
      events: requests.length > 0 ? requests : undefined,
    })
  })
  return { allMonths }
}
