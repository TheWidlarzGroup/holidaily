declare module 'react-native-secure-storage'

declare module 'react-native-month-year-picker' {
  import MonthPicker, { ACTION_DATE_SET, ACTION_DISMISSED } from 'react-native-month-year-picker'

  export default MonthPicker
  export { ACTION_DATE_SET, ACTION_DISMISSED }
}

declare module 'react-native-calendars' {
  import DayComponentProps, {
    CalendarProps,
    Calendar,
    LocaleConfig,
  } from '@types/react-native-calendars'

  export { DayComponentProps, Calendar, LocaleConfig, CalendarProps }
}
