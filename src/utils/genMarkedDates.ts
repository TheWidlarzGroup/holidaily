import { getDatesBetween } from './dates'

export type MarkedDateType = {
  selected?: boolean
  color?: string
  endingDay?: boolean
  startingDay?: boolean
}

export const genMarkedDates = (start?: string, end?: string) => {
  if (!start || !end) return {}
  const obj: any = {}
  const dates = getDatesBetween(start, end)

  dates.forEach((date) => {
    obj.markedDates[date] = {
      selected: true,
    }
  })

  obj.markedDates[dates[0]].startingDay = true
  obj.markedDates[dates[dates.length - 1]].endingDay = true
  return obj
}
