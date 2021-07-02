import React from 'react'
import { Box } from 'utils/theme'
import { CalendarDayDots } from './CalendarDayDots'
import { CalendarDayMain } from './CalendarDayMain'
import { NewDayComponentProps } from './CalendarTypes'

export const CalendarDay = ({ date, state, marking, onPress }: NewDayComponentProps) => (
  <Box alignItems="center" position="relative">
    <CalendarDayMain marking={marking} date={date} onPress={onPress} state={state} />
    <CalendarDayDots marking={marking} />
  </Box>
)
