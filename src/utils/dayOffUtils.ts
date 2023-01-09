import { eachDayOfInterval } from 'date-fns'
import type { DayOffRequest, Team, User } from 'mockApi/models'
import { isWeekendOrHoliday } from 'poland-public-holidays'
import type { DayOffEvent } from 'screens/calendar/components/DayEvent'
import type { HolidayRequestMonthType } from 'types/HolidayRequestMonthType'
import { getISODateString, getISOMonthYearString, isDateBetween, isWeekend } from './dates'
import { generateUUID } from './generateUUID'
import { getUserTeamId } from './getUserTeamId'

export const drawnDayoffInAlreadyScheduledTime = (
  req: Pick<DayOffRequest, 'startDate' | 'endDate'>,
  requests: Omit<DayOffRequest, 'id'>[]
) => {
  const start = new Date(req.startDate)
  const end = new Date(req.endDate)
  return requests.some((existingReq) => {
    const days = eachDayOfInterval({ start, end })
    return days.some((day) => isDateBetween(day, existingReq.startDate, existingReq.endDate))
  })
}

export const getAllSingleHolidayRequests = (allUsers: User[], teams: Team[], appUser: User) => {
  const allSingleRequests: DayOffEvent[] = []

  allUsers.forEach((user) => {
    user.requests.forEach((req) => {
      const dates = eachDayOfInterval({
        start: new Date(req.startDate),
        end: new Date(req.endDate),
      })
      dates.forEach((date) => {
        if (isWeekendOrHoliday(date)) return
        const request = {
          id: generateUUID(),
          firstName: user.firstName,
          lastName: user.lastName,
          reason: req.description,
          position: user.occupation,
          color: user.userColor,
          categoryId: getUserTeamId(`${user.firstName} ${user.lastName}`, teams),
          date: getISODateString(date),
          monthYear: getISOMonthYearString(date),
          photo: user.photo,
          status: req.status,
        }
        if (request.lastName === appUser.lastName && request.firstName === appUser.firstName) {
          if (request.status === 'cancelled' || request.status === 'pending') return
        }
        allSingleRequests.push(request)
      })
    })
  })

  return { allSingleRequests }
}

export const getFirstRequestsOfMonth = (allRequestsOfMonth: HolidayRequestMonthType) => {
  const firstDaysOfNextMonthRequests = allRequestsOfMonth?.days.filter((day) => {
    if (isWeekend(day.date)) return
    return (
      day.date.slice(-2) === '01' ||
      day.date.slice(-2) === '02' ||
      day.date.slice(-2) === '03' ||
      day.date.slice(-2) === '04'
    )
  })
  return firstDaysOfNextMonthRequests
}
