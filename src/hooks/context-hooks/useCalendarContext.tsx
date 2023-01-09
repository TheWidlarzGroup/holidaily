import { useContext } from 'react'
import { CalendarContext } from 'contexts/CalendarContext'

export const useCalendarContext = () => {
  const context = useContext(CalendarContext)

  if (context) {
    return context
  }

  throw Error('Use this hook in CalendarProvider scope')
}
