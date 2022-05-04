import { eachDayOfInterval, format } from 'date-fns'
import { Team, User } from 'mockApi/models/mirageTypes'
import { DayOffEvent } from 'screens/calendar/components/DayEvent'
import { getISODateString, getISOMonthYearString } from './dates'
import { generateUUID } from './generateUUID'
import { getUserTeamId } from './getUserTeamId'

export const getAllSingleHolidayRequests = (allUsers: User[], teams: Team[]) => {
  const allSingleRequests: DayOffEvent[] = []

  allUsers.forEach((user) => {
    user.requests.forEach((req) => {
      const dates = eachDayOfInterval({
        start: new Date(req.startDate),
        end: new Date(req.endDate),
      })
      dates.forEach((date) => {
        const request = {
          id: generateUUID(),
          person: `${user.firstName} ${user.lastName}`,
          personLastName: user.lastName,
          reason: req.description,
          position: user.occupation,
          color: user.userColor,
          categoryId: getUserTeamId(`${user.firstName} ${user.lastName}`, teams),
          date: getISODateString(date),
          monthYear: getISOMonthYearString(date),
          photo: user.photo,
        }
        const dayOfWeek = format(new Date(request.date), 'e')
        if (dayOfWeek === '7' || dayOfWeek === '1') return
        allSingleRequests.push(request)
      })
    })
  })

  return { allSingleRequests }
}
