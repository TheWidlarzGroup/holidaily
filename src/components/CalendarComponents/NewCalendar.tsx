import React from 'react'
import { Calendar } from 'react-native-calendars'
import { NewCalendarBaseProps } from './CalendarTypes'

export class NewCalendar extends React.Component<NewCalendarBaseProps> {
  render() {
    return Calendar
  }
}
