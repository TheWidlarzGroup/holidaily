import { createContext } from 'react'
import { MonthType } from 'hooks/useGetHolidayRequests'

export type ContextProps = {
  requests: MonthType[] | undefined
  updateRequests: F1<MonthType[]>
}

export const RequestsContext = createContext<ContextProps | null>(null)