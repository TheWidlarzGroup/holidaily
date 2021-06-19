import {
  DayComponentProps,
  MultiDotMarking,
  MultiPeriodMarking,
  PeriodMarking,
  DotMarking,
  CustomMarking,
  CalendarBaseProps,
} from 'react-native-calendars'
import { MarkedDateType } from 'utils/genMarkedDates'

type DayComponentPropsWithoutMarking = Omit<DayComponentProps, 'marking'>

export type MarkingType = {
  marking: MultiDotMarking & MultiPeriodMarking & PeriodMarking & DotMarking & CustomMarking
}

export type NewDayComponentProps = DayComponentPropsWithoutMarking & MarkingType

type CalendarBasePropsWithoutDay = Omit<CalendarBaseProps, 'dayComponent'>

type NewCalendarMarkingProps = {
  markedDates: MarkedDateType
}

export type NewCalendarBaseProps = CalendarBasePropsWithoutDay &
  NewDayComponentProps &
  NewCalendarMarkingProps
