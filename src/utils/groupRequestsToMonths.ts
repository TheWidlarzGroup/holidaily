/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { MonthType } from 'hooks/useGetHolidayRequests'
import { DayOffEvent } from 'screens/calendar/components/DayEvent'
import { groupArrayByKey } from './groupArrayByKey'
import { sortByRequestDate } from './sortByDate'

export const groupRequestsToMonths = (allRequests: DayOffEvent[]) => {
  const groupedMonths: MonthType[] = []

  const groupedAllRequestsByMonth = groupArrayByKey(allRequests, 'monthYear')
  // for loops are used for better performance
  for (const key in groupedAllRequestsByMonth) {
    const groupedRequestsByDay = groupArrayByKey(groupedAllRequestsByMonth[key], 'date')
    let daysOfMonth = []

    for (const key in groupedRequestsByDay) {
      const day = { date: key, events: groupedRequestsByDay[key] }
      daysOfMonth.push(day)
    }

    daysOfMonth = daysOfMonth.sort(sortByRequestDate)

    const month = { date: key, days: daysOfMonth }

    groupedMonths.push(month)
  }

  return { groupedMonths }
}
