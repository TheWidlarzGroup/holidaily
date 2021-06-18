import React from 'react'
import { Box } from 'utils/theme'
import { NewDayComponentProps } from './CalendarTypes'
import { CalendarDayDots } from './CalendarDayDots'
import { CalendarDayMain } from './CalendarDayMain'

export const CalendarDay = ({ date, state, marking, onPress }: NewDayComponentProps) => (
  <Box alignItems="center" position="relative" padding="s">
    <CalendarDayMain marking={marking} date={date} onPress={onPress} state={state} />
    <CalendarDayDots marking={marking} />
  </Box>
)
