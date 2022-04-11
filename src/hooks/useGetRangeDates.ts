import { eachDayOfInterval, format } from 'date-fns'
import { useTeamsContext } from 'hooks/useTeamsContext'
import { DayOffEvent } from 'screens/calendar/components/DayEvent'
import { DayInfoProps } from 'screens/calendar/components/DayInfo'
import { getISODateString, getISOMonthYearString } from 'utils/dates'
import { generateUUID } from 'utils/generateUUID'

export type MonthType = {
  date: string
  days: DayInfoProps[]
}

export const useGetRangeDates = (startDate: string, endDate: string) => {
  const { teams } = useTeamsContext()

  const getAllDaysOfHolidayRequests = () => {
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
            const req = {
              id: generateUUID(),
              person: `${teams?.[i]?.users?.[j]?.firstName} ${teams?.[i]?.users?.[j]?.lastName}`,
              reason: teams?.[i]?.users?.[j]?.requests?.[k].description,
              position: teams?.[i]?.users?.[j]?.occupation,
              color: teams?.[i]?.users?.[j]?.userColor,
              categoryId: 1,
              date: getISODateString(dates?.[l]),
              monthYear: getISOMonthYearString(dates?.[l]),
            }
            allRequests.push(req)
          }
        }
      }
    }

    function groupBy(objectArray, property: string) {
      return objectArray.reduce((acc, obj) => {
        const key = obj[property]
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(obj)
        return acc
      }, {})
    }
    const grouped = groupBy(allRequests, 'monthYear')
    // for (const [key, value] of Object.entries(grouped)) {
    //   console.log(`${key}: ${value}`)
    // }

    return allRequests
  }

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

    const requests = getAllDaysOfHolidayRequests()?.filter(
      (req: DayOffEvent) => req.date === getISODateString(date)
    )
    // const requests = getAllDaysOfHolidayRequests()

    if (requests?.length === 0) return

    const dayOfWeek = format(date, 'e')
    monthDate = getISOMonthYearString(date)
    if (dayOfWeek === '7') return
    if (dayOfWeek === '1') return
    return daysInMonth.push({
      date: getISODateString(date),
      events: requests,
    })
  })

  return { allMonths }
}
