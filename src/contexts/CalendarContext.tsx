import { createContext } from 'react'

export type CalendarProps = {
  periodStart: string
  periodEnd: string
  handleSetPeriodStart: F1<string>
  handleSetPeriodEnd: F1<string>
}

export const CalendarContext = createContext<CalendarProps | null>(null)
