import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { useCallback } from 'react'
import { calculatePTO, getDatesBetween } from './dates'

export type MarkedDateType = {
  selected?: boolean
  color?: string
  endingDay?: boolean
  startingDay?: boolean
  period?: boolean
  isInvalid?: boolean
}

export const genMarkedDates = (start?: string, end?: string, isInvalid?: boolean) => {
  if (!start || !end) return {}
  const calendarDatesObj: { [key: string]: MarkedDateType } = {}
  const dates = getDatesBetween(start, end)
  dates.forEach((date, idx) => {
    calendarDatesObj[date] = {
      period: true,
      startingDay: idx === 0,
      endingDay: idx === dates.length - 1,
      isInvalid,
    }
  })

  return calendarDatesObj
}

export const useMarkedDates = (isInvalid?: boolean) => {
  const { user } = useUserContext()
  const availablePto = user?.availablePto ?? 0
  return useCallback(
    (start?: string, end?: string) => {
      if (!start || !end) return {}
      const periodInvalid = isInvalid ?? calculatePTO(start, end) > availablePto
      return genMarkedDates(start, end, periodInvalid)
    },
    [availablePto, isInvalid]
  )
}
