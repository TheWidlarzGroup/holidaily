import { createContext } from 'react'
import { MonthType } from 'hooks/useGetHolidayRequests'

export type RequestContextProps = {
  requests: MonthType[]
  updateRequests: F1<MonthType[]>
}

export const RequestsContext = createContext<RequestContextProps | null>(null)
