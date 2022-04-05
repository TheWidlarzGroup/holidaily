import React from 'react'
import { Box } from 'utils/theme'
import { CalendarDayDots } from './CalendarDayDots'
import { CalendarDayMain, MarkingStyles } from './CalendarDayMain'
import { NewDayComponentProps } from './CalendarTypes'

export const CalendarDay = ({
  date,
  state,
  marking,
  onPress,
  styles,
}: NewDayComponentProps & { styles: MarkingStyles }) => (
  <Box alignItems="center" position="relative">
    <CalendarDayMain
      marking={marking}
      date={date}
      onPress={onPress}
      state={state}
      styles={styles}
    />
    <CalendarDayDots marking={marking} />
  </Box>
)
