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
  const obj: { [key: string]: MarkedDateType } = {}
  const dates = getDatesBetween(start, end)

  dates.forEach((date) => {
    obj[date] = {
      period: true,
    }
  })

  if (obj?.[dates?.[0]]) obj[dates[0]].startingDay = true
  if (obj?.[dates?.[dates?.length - 1]]) obj[dates[dates.length - 1]].endingDay = true
  return obj
}
