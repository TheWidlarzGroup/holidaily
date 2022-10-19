import React, { ReactNode, useEffect, useState } from 'react'
import { useGetHolidayRequests } from 'hooks/useGetHolidayRequests'
import { mergeRequestsArrays } from 'utils/mergeRequestsArrays'
import { getMonthsWithoutRequests } from 'screens/calendar/getMonthsWithoutRequests'
import { HolidayRequestMonthType } from 'types/HolidayRequestMonthType'
import { RequestContextProps, RequestsContext } from './RequestsContext'

type RequestProviderProps = {
  children: ReactNode
}

export const RequestsContextProvider = ({ children }: RequestProviderProps) => {
  const { allMonths } = useGetHolidayRequests()
  const [requests, setRequests] = useState<HolidayRequestMonthType[]>(allMonths || [])

  useEffect(() => {
    if (allMonths.length > 0) {
      const monthsWithoutRequests = getMonthsWithoutRequests()
      setRequests(mergeRequestsArrays(allMonths, monthsWithoutRequests))
    }
  }, [allMonths])

  const value: RequestContextProps = { requests }
  return <RequestsContext.Provider value={value}>{children}</RequestsContext.Provider>
}
