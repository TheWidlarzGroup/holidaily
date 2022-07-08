import React, { ReactNode, useState, useEffect } from 'react'
import { useGetHolidayRequests } from 'hooks/useGetHolidayRequests'
import { mergeRequestsArrays } from 'utils/mergeRequestsArrays'
import { getMonthsWithoutRequests } from 'screens/calendar/getMonthsWithoutRequests'
import { HolidailyRequestMonthType } from 'types/HolidayRequestMonthType'
import { RequestContextProps, RequestsContext } from './RequestsContext'

type RequestProviderProps = {
  children: ReactNode
}

export const RequestsContextProvider = ({ children }: RequestProviderProps) => {
  const { allMonths } = useGetHolidayRequests()
  const [requests, setRequests] = useState<HolidailyRequestMonthType[]>(allMonths || [])

  useEffect(() => {
    if (allMonths.length > 0) {
      const monthsWithoutRequests = getMonthsWithoutRequests()
      setRequests(mergeRequestsArrays(allMonths, monthsWithoutRequests))
    }
  }, [allMonths])

  const value: RequestContextProps = { requests }
  return <RequestsContext.Provider value={value}>{children}</RequestsContext.Provider>
}
