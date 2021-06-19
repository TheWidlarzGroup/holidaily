import React from 'react'
import { Calendar, CalendarMarkingProps } from 'react-native-calendars'
import { NewCalendarBaseProps } from './CalendarTypes'

export class NewCalendar extends React.Component<NewCalendarBaseProps & CalendarMarkingProps> {
  render() {
    return Calendar
  }
}
