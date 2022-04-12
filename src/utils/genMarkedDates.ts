import { getDatesBetween } from './dates'

type MarkedDateType = {
  selected?: boolean
  color?: string
  endingDay?: boolean
  startingDay?: boolean
  period?: boolean
}

export const genMarkedDates = (start?: string, end?: string) => {
  if (!start || !end) return {}
  const calendarDatesObj: { [key: string]: MarkedDateType } = {}
  const dates = getDatesBetween(start, end)
  dates.forEach((date, idx) => {
    calendarDatesObj[date] = {
      period: true,
      startingDay: idx === 0,
      endingDay: idx === dates.length - 1,
    }
  })

  return calendarDatesObj
}
