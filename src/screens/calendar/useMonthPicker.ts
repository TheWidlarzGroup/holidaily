import { RefObject, useState } from 'react'
import { ACTION_DATE_SET, ACTION_DISMISSED } from 'react-native-month-year-picker'
import XDate from 'xdate'
import { Calendar as RNCalendar } from 'react-native-calendars'
import { DateTime } from 'luxon'

export type MonthChangeEventType = ACTION_DATE_SET | ACTION_DISMISSED
export type MonthChangeNewDate = Date

export const useMonthPicker = (
  calendarRef: RefObject<RNCalendar>,
  updateSelectedDate: F1<DateTime>
) => {
  const [isMonthPickerVisible, setIsMonthPickerVisible] = useState<boolean>(false)

  const handleMonthChange = (event: MonthChangeEventType, newDate: MonthChangeNewDate) => {
    setIsMonthPickerVisible(false)
    switch (event) {
      case ACTION_DATE_SET:
        updateSelectedDate(DateTime.fromJSDate(newDate))
        calendarRef.current.updateMonth(new XDate(newDate), true)
        break
      case ACTION_DISMISSED:
        break
      default:
        break
    }
  }

  const displayMonthPicker = () => setIsMonthPickerVisible(true)
  const hideMonthPicker = () => setIsMonthPickerVisible(false)
  return {
    isMonthPickerVisible,
    displayMonthPicker,
    hideMonthPicker,
    handleMonthChange,
  }
}
