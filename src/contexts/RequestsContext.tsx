import { createContext } from 'react'
import { MonthType } from 'hooks/useGetRangeDates'

export type ContextProps = {
  requests: MonthType[] | undefined
  updateRequests: (newData: MonthType[]) => void
}

export const RequestsContext = createContext<ContextProps | null>(null)
