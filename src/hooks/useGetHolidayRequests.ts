/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { eachDayOfInterval } from 'date-fns'
import { useTeamsContext } from 'hooks/useTeamsContext'
import { useEffect, useMemo } from 'react'
import { DayOffEvent } from 'screens/calendar/components/DayEvent'
import { DayInfoProps } from 'screens/calendar/components/DayInfo'
import { getISODateString, getISOMonthYearString } from 'utils/dates'
import { generateUUID } from 'utils/generateUUID'
import { groupArrayByKey } from 'utils/groupArrayByKey'
import { sortByRequestDate } from 'utils/sortByDate'

export type MonthType = {
  date: string
  days: DayInfoProps[]
}

export const useGetHolidayRequests = () => {
  const { teams, allUsers } = useTeamsContext()

  const allMonths: MonthType[] = useMemo(() => [], [])

  useEffect(() => {
    const allRequests: DayOffEvent[] = []

    if (!allUsers?.length) return

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
            reason: req.description,
            position: user.occupation,
            color: user.userColor,
            categoryId: 1,
            date: getISODateString(date),
            monthYear: getISOMonthYearString(date),
          }
          allRequests.push(request)
        })
      })
    })

    const groupedAllRequestsByMonth = groupArrayByKey(allRequests, 'monthYear')

    for (const key in groupedAllRequestsByMonth) {
      const groupedRequestsByDay = groupArrayByKey(groupedAllRequestsByMonth[key], 'date')
      let daysOfMonth = []

      for (const key in groupedRequestsByDay) {
        const day = { date: key, events: groupedRequestsByDay[key] }
        daysOfMonth.push(day)
      }

      daysOfMonth = daysOfMonth.sort(sortByRequestDate)

      const month = { date: key, days: daysOfMonth }

      allMonths.push(month)
    }
  }, [allMonths, allUsers, teams])

  return { allMonths }
}
