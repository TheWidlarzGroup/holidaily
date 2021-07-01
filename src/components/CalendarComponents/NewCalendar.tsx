import React, { forwardRef } from 'react'
import { Calendar, CalendarList } from 'react-native-calendars'
import { NewCalendarBaseProps, NewCalendarListProps } from './CalendarTypes'

export const NewCalendar = forwardRef<Calendar, NewCalendarBaseProps>((props, ref) => (
  <Calendar {...props} ref={ref} />
))
NewCalendar.displayName = 'NewCalendar'

export const NewCalendarList = (props: NewCalendarListProps) => <CalendarList {...props} />
