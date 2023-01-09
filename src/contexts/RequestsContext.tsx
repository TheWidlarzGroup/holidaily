import { createContext } from 'react'
import { HolidayRequestMonthType } from '../types/HolidayRequestMonthType'

export type RequestContextProps = {
  requests: HolidayRequestMonthType[]
}

export const RequestsContext = createContext<RequestContextProps | null>(null)
