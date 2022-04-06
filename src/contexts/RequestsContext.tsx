import { createContext } from 'react'
import { MonthType } from 'hooks/useGetRangeDates'

export type ContextProps = {
  requests: MonthType[] | undefined
  updateRequests: F1<MonthType[]>
  updateRange: F1<{ start: string; end: string }>
}

export const RequestsContext = createContext<ContextProps | null>(null)
