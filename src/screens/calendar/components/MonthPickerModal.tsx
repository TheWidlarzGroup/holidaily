import React from 'react'
import { CustomModal } from 'components/CustomModal'
import MonthPicker from 'react-native-month-year-picker'
import { DateTime } from 'luxon'
import { MonthChangeEventType, MonthChangeNewDate } from '../useMonthPicker'

type MonthPickerModalProps = {
  isMonthPickerVisible: boolean
  hideMonthPicker: F0
  handleMonthChange: F2<MonthChangeEventType, MonthChangeNewDate>
  selectedDate: DateTime
}

export const MonthPickerModal = ({
  isMonthPickerVisible,
  hideMonthPicker,
  handleMonthChange,
  selectedDate,
}: MonthPickerModalProps) => (
  <CustomModal
    style={{
      position: 'absolute',
      bottom: -20,
      left: -20,
      right: -20,
    }}
    isVisible={isMonthPickerVisible}
    onBackdropPress={hideMonthPicker}>
    <MonthPicker onChange={handleMonthChange} value={selectedDate.toJSDate()} />
  </CustomModal>
)
