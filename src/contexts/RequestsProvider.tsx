import React, { ReactNode, useState, useCallback, useEffect } from 'react'
import { MonthType, useGetRangeDates } from 'hooks/useGetRangeDates'
import { ContextProps, RequestsContext } from './RequestsContext'

type ProviderProps = {
  children: ReactNode
}

export const RequestsContextProvider = ({ children }: ProviderProps) => {
  const [range, setRange] = useState({ start: '2022-04-01', end: '2022-09-30' })
  const { allMonths } = useGetRangeDates(range.start, range.end)
  const [requests, setRequests] = useState<MonthType[] | undefined>(allMonths)

  const updateRequests = useCallback((newData: MonthType[]) => {
    setRequests((prev) => (prev ? [...prev, ...newData] : newData))
  }, [])

  const updateRange = useCallback((newRange: typeof range) => {
    setRange(newRange)
  }, [])

  useEffect(() => {
    if (allMonths.length > 0) {
      setRequests(allMonths)
    }
  }, [allMonths])

  const value: ContextProps = { requests, updateRequests, updateRange }
  return <RequestsContext.Provider value={value}>{children}</RequestsContext.Provider>
}
