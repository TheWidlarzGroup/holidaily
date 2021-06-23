import { getDatesBetween } from './dates'

type MarkedDateType = {
  selected?: boolean
  color?: string
  endingDay?: boolean
  startingDay?: boolean
}

export const genMarkedDates = (start?: string, end?: string) => {
  if (!start || !end) return {}
  const obj: { [key: string]: MarkedDateType } = {}
  const dates = getDatesBetween(start, end)

  dates.forEach((date) => {
    obj[date] = {
      selected: true,
    }
  })

  obj[dates[0]].startingDay = true
  obj[dates[dates.length - 1]].endingDay = true
  return obj
}
