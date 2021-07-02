import {
  DayComponentProps,
  MultiDotMarking,
  PeriodMarking,
  CalendarBaseProps,
  Calendar,
  CalendarTheme,
  CustomMarking,
  CalendarListBaseProps,
} from 'react-native-calendars'

export type DayComponentPropsWithoutMarking = Omit<
  DayComponentProps,
  'marking' | 'onLongPress' | 'theme'
>

type IsPeriod = {
  period?: boolean
}

export type DotsMarking = {
  marking: MultiDotMarking
}

export type MarkingType = DotsMarking & {
  marking: PeriodMarking & IsPeriod
}

type MarkedDatesTypes = {
  markedDates?: {
    [date: string]: PeriodMarking | MultiDotMarking | CustomMarking
  }
  markingType: string
}

export type NewDayComponentProps = DayComponentPropsWithoutMarking & MarkingType

type CalendarBasePropsWithoutDay = Omit<CalendarBaseProps, 'dayComponent'>

export type NewCalendarBaseProps = CalendarBasePropsWithoutDay & {
  theme: CalendarTheme
} & MarkedDatesTypes

export type NewCalendarListProps = NewCalendarBaseProps &
  Omit<
    CalendarListBaseProps,
    'CalendarBaseProps' | 'dayComponent' | 'marking' | 'onLongPress' | 'theme'
  >

export type CalendarRef = Calendar & {
  updateMonth: F1<XDate>
}
