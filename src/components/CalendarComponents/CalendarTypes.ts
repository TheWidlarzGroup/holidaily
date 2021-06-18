import {
  DayComponentProps,
  MultiDotMarking,
  MultiPeriodMarking,
  PeriodMarking,
  DotMarking,
  CustomMarking,
} from 'react-native-calendars'

type DayComponentPropsWithoutMarking = Omit<DayComponentProps, 'marking'>

export type MarkingType = {
  marking: MultiDotMarking & MultiPeriodMarking & PeriodMarking & DotMarking & CustomMarking
}

export type NewDayComponentProps = DayComponentPropsWithoutMarking & MarkingType
