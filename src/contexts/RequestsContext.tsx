import { createContext } from 'react'
import { HolidailyRequestMonthType } from '../types/HolidayRequestMonthType'

export type RequestContextProps = {
  requests: HolidailyRequestMonthType[]
  updateRequests: F1<HolidailyRequestMonthType[]>
}

export const RequestsContext = createContext<RequestContextProps | null>(null)
