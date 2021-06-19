import {
  DayComponentProps,
  MultiDotMarking,
  PeriodMarking,
  CalendarBaseProps,
} from 'react-native-calendars'

export type DayComponentPropsWithoutMarking = Omit<DayComponentProps, 'marking'>

export type MarkingType = {
  marking: PeriodMarking & Partial<MultiDotMarking>
}

type MarkedDatesTypes = {
  markedDates: {
    [date: string]: PeriodMarking & Partial<MultiDotMarking>
  }
  markingType: string
}

export type NewDayComponentProps = Partial<DayComponentPropsWithoutMarking> &
  Partial<MarkingType> &
  MarkedDatesTypes

type CalendarBasePropsWithoutDay = Omit<CalendarBaseProps, 'dayComponent'>

export type NewCalendarBaseProps = CalendarBasePropsWithoutDay & NewDayComponentProps
