import { MultiDotMarking, PeriodMarking } from 'react-native-calendars'
import { getDatesBetween } from './dates'

export type MarkedDateType = {
  [date: string]: PeriodMarking & Partial<MultiDotMarking>
}

export const genMarkedDates = (start?: string, end?: string) => {
  if (!start || !end) return {}
  const obj: MarkedDateType = {}
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
