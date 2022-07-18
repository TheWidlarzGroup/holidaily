import React, { useState } from 'react'
import { CalendarContext } from './CalendarContext'

type Props = {
  children: React.ReactNode
}

export const CalendarProvider = ({ children }: Props) => {
  const [periodStart, setPeriodStart] = useState('')
  const [periodEnd, setPeriodEnd] = useState('')

  const handleSetPeriodStart = (e: string) => {
    setPeriodStart(e)
  }

  const handleSetPeriodEnd = (e: string) => {
    setPeriodEnd(e)
  }

  const value = { periodStart, periodEnd, handleSetPeriodStart, handleSetPeriodEnd }

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>
}
