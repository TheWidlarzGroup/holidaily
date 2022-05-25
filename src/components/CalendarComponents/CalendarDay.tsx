import React from 'react'
import { Box } from 'utils/theme'
import { CalendarDayDots } from './CalendarDayDots'
import { CalendarDayMain, MarkingStyles } from './CalendarDayMain'
import { NewDayComponentProps } from './CalendarTypes'

export const CalendarDay = (
  p: NewDayComponentProps & MarkingStyles & { ignoreDarkMode?: true }
) => (
  <Box alignItems="center" position="relative">
    <CalendarDayMain {...p} />
    {!!p.marking?.dots && <CalendarDayDots marking={p.marking} />}
  </Box>
)
