import React from 'react'
import { DayComponentProps } from 'react-native-calendars'
import { Box } from 'utils/theme'
import { CalendarDayDots } from './CalendarDayDots'
import { CalendarDayMain } from './CalendarDayMain'

export const CalendarDay = ({ date, state, marking, onPress }: DayComponentProps) => (
  <Box alignItems="center" position="relative" padding="s">
    <CalendarDayMain marking={marking} date={date} onPress={onPress} state={state} />
    <CalendarDayDots marking={marking} />
  </Box>
)
