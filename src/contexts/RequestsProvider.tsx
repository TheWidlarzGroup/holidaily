import React, { ReactNode, useState, useCallback, useEffect } from 'react'
import { MonthType, useGetHolidayRequests } from 'hooks/useGetHolidayRequests'
import { mergeRequestsArrays } from 'utils/mergeRequestsArrays'
import { getWeekendDays } from 'utils/getWeekendDays'
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
      const monthsList = allMonths.map((month) => month.date)
      const allMonthsWithWeekendDays = getWeekendDays(monthsList)
      setRequests(mergeRequestsArrays(allMonths, allMonthsWithWeekendDays))
    }
  }, [allMonths])

  const value: RequestContextProps = { requests, updateRequests }
  return <RequestsContext.Provider value={value}>{children}</RequestsContext.Provider>
}
