import {
  DayComponentProps,
  MultiDotMarking,
  MultiPeriodMarking,
  PeriodMarking,
  DotMarking,
  CustomMarking,
  CalendarBaseProps,
  CalendarMarkingProps,
} from 'react-native-calendars'

export type DayComponentPropsWithoutMarking = Omit<DayComponentProps, 'marking'>

export type MarkingType = {
  marking: MultiDotMarking & MultiPeriodMarking & PeriodMarking & DotMarking & CustomMarking
}

export type NewDayComponentProps = Partial<DayComponentPropsWithoutMarking> & Partial<MarkingType>

type CalendarBasePropsWithoutDay = Omit<CalendarBaseProps, 'dayComponent'>

export type NewCalendarBaseProps = CalendarBasePropsWithoutDay &
  NewDayComponentProps &
  CalendarMarkingProps
