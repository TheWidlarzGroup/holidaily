import { DateTime } from 'luxon'

export const isWeekend = (date: DateTime): boolean => date.weekday === 6 || date.weekday === 7
