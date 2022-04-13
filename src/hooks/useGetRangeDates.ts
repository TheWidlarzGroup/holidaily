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

export const useGetRangeDates = () => {
  const { teams } = useTeamsContext()

  const allMonths: MonthType[] = useMemo(() => [], [])

  useEffect(() => {
    const allRequests: DayOffEvent[] = []

    if (!teams?.length) return
    for (let i = 0; i < teams?.length; i++) {
      for (let j = 0; j < teams?.[i]?.users?.length; j++) {
        for (let k = 0; k < teams?.[i]?.users?.[j]?.requests?.length; k++) {
          const dates = eachDayOfInterval({
            start: new Date(teams?.[i]?.users?.[j]?.requests?.[k]?.startDate),
            end: new Date(teams?.[i]?.users?.[j]?.requests?.[k]?.endDate),
          })
          for (let l = 0; l < dates.length; l++) {
            const request = {
              id: generateUUID(),
              person: `${teams?.[i]?.users?.[j]?.firstName} ${teams?.[i]?.users?.[j]?.lastName}`,
              reason: teams?.[i]?.users?.[j]?.requests?.[k].description,
              position: teams?.[i]?.users?.[j]?.occupation,
              color: teams?.[i]?.users?.[j]?.userColor,
              categoryId: 1,
              date: getISODateString(dates?.[l]),
              monthYear: getISOMonthYearString(dates?.[l]),
            }
            allRequests.push(request)
          }
        }
      }
    }

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
  }, [allMonths, teams])

  return { allMonths }
}
