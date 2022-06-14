import type { Dot } from 'components/ExpandableCalendar'
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
  dots?: Dot[]
}

type GenMarkedDatesOptions = {
  dotMarking?: {
    dates: Dot[]
  }
}

export const genMarkedDates = (
  start?: string,
  end?: string,
  isInvalid?: boolean,
  options?: GenMarkedDatesOptions
) => {
  const calendarDatesObj: { [key: string]: MarkedDateType } = {}
  const dots = options?.dotMarking?.dates ?? []
  let dates: string[] = []
  if (start && end) dates = getDatesBetween(start, end)
  dates.forEach((date, idx) => {
    const dot = options?.dotMarking?.dates.find((dot) => dot.key === date)
    calendarDatesObj[date] = {
      period: true,
      startingDay: idx === 0,
      endingDay: idx === dates.length - 1,
      isInvalid,
      dots: dot ? [dot] : undefined,
    }
  })

  dots.forEach((dot) => {
    if (calendarDatesObj[dot.key]) return
    calendarDatesObj[dot.key] = {
      dots: [dot],
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
