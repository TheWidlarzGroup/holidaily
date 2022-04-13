import React, { ReactNode, useState, useCallback, useEffect } from 'react'
import { MonthType, useGetHolidayRequests } from 'hooks/useGetHolidayRequests'
import { ContextProps, RequestsContext } from './RequestsContext'

type ProviderProps = {
  children: ReactNode
}

export const RequestsContextProvider = ({ children }: ProviderProps) => {
  const { allMonths } = useGetHolidayRequests()
  const [requests, setRequests] = useState<MonthType[] | undefined>(allMonths)

  const updateRequests = useCallback((newData: MonthType[]) => {
    setRequests((prev) => (prev ? [...prev, ...newData] : newData))
  }, [])

  useEffect(() => {
    if (allMonths.length > 0) {
      setRequests(allMonths)
    }
  }, [allMonths])

  const value: ContextProps = { requests, updateRequests }
  return <RequestsContext.Provider value={value}>{children}</RequestsContext.Provider>
}
