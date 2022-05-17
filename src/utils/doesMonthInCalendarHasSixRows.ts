import { format, getDaysInMonth } from 'date-fns'

export const doesMonthInCalendarHasSixRows = (month: Date) => {
  const daysInMonth = getDaysInMonth(new Date(month))
  const monthYear = format(new Date(month), 'yyyy-MM-01')
  const firstDayOfMonth = format(new Date(monthYear), 'EEE')
  if (daysInMonth === 30 && firstDayOfMonth === 'Sun') return true
  if ((daysInMonth === 31 && firstDayOfMonth === 'Sat') || firstDayOfMonth === 'Sun') return true
  return false
}
