import { createContext } from 'react'
import { HolidailyRrequestMonthType } from '../types/HolidayRequestMonthType'

export type RequestContextProps = {
  requests: HolidailyRrequestMonthType[]
  updateRequests: F1<HolidailyRrequestMonthType[]>
}

export const RequestsContext = createContext<RequestContextProps | null>(null)
