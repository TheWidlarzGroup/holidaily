import {
  DayComponentProps,
  MultiDotMarking,
  MultiPeriodMarking,
  PeriodMarking,
  DotMarking,
  CustomMarking,
} from 'react-native-calendars'

type DayComponentProps2 = Omit<DayComponentProps, 'marking'>

export type MarkingType = {
  marking: MultiDotMarking & MultiPeriodMarking & PeriodMarking & DotMarking & CustomMarking
}

export type NewDayComponentProps = DayComponentProps2 & MarkingType
