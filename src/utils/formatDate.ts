/* eslint-disable no-fallthrough */
import { formatDistance, isToday, format as formatFNS, Locale } from 'date-fns'

export type DateFormat = 'relativeToday' | 'shortMonth' | 'longMonthNoYear' | 'ago' | 'weekday'

export function formatDate(date: Date, format: DateFormat, locale: Locale) {
  const internalFormat = (format: string) => formatFNS(date, format, { locale })

  let currentFormat = format

  switch (currentFormat) {
    case 'relativeToday':
      currentFormat = isToday(date) ? 'ago' : 'shortMonth'
    case 'shortMonth':
      return internalFormat('d MMM y')
    case 'longMonthNoYear':
      return internalFormat('d MMMM')
    case 'ago':
      return formatDistance(date, new Date(), { locale, addSuffix: true })
    case 'weekday':
      return internalFormat('cccc')
    default:
      throw Error('Invalid date format')
  }
}
