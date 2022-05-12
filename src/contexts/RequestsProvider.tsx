import React, { ReactNode, useState, useCallback, useEffect } from 'react'
import { MonthType, useGetHolidayRequests } from 'hooks/useGetHolidayRequests'
import { eachDayOfInterval, lastDayOfMonth } from 'date-fns'
import { getISODateString } from 'utils/dates'
import { DayInfoProps } from 'screens/calendar/components/DayInfo'
import { sortByRequestDate } from 'utils/sortByDate'
import { RequestContextProps, RequestsContext } from './RequestsContext'

type RequestProviderProps = {
  children: ReactNode
}

export const RequestsContextProvider = ({ children }: RequestProviderProps) => {
  const { allMonths } = useGetHolidayRequests()
  const [requests, setRequests] = useState<MonthType[]>(allMonths || [])

  const updateRequests = useCallback((newData: MonthType[]) => {
    setRequests((prev) => [...prev, ...newData])
  }, [])

  useEffect(() => {
    if (allMonths.length > 0) {
      const monthsWithWeekendDays = allMonths.map((month) => {
        const firstMonthDay = new Date(`${month.date}-01`)
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
          date: month.date,
          days,
        }
      })

      const mergedMonths: MonthType[] = []
      allMonths.forEach((x) => {
        monthsWithWeekendDays.forEach((y) => {
          if (x.date === y.date) {
            const days = [...x.days, ...y.days].sort(sortByRequestDate)
            mergedMonths.push({
              date: x.date,
              days,
            })
          }
        })
      })
      setRequests(mergedMonths)
    }
  }, [allMonths])

  const value: RequestContextProps = { requests, updateRequests }
  return <RequestsContext.Provider value={value}>{children}</RequestsContext.Provider>
}
