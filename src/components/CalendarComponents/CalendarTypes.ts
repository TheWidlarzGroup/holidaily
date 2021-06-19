import {
  DayComponentProps,
  MultiDotMarking,
  MultiPeriodMarking,
  PeriodMarking,
  DotMarking,
  CustomMarking,
  CalendarProps,
} from 'react-native-calendars'

type DayComponentPropsWithoutMarking = Omit<DayComponentProps, 'marking'>

export type MarkingType = {
  marking: MultiDotMarking & MultiPeriodMarking & PeriodMarking & DotMarking & CustomMarking
}

export type NewDayComponentProps = DayComponentPropsWithoutMarking & MarkingType

type CalendarBasePropsWithoutDay = Omit<CalendarProps, 'dayComponent'>

export type NewCalendarBaseProps = CalendarBasePropsWithoutDay & NewDayComponentProps
