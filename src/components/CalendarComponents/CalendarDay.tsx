import { useCalendarPeriodStyles } from 'hooks/useCalendarStyles'
import React from 'react'
import { Box } from 'utils/theme'
import { CalendarDayDots } from './CalendarDayDots'
import { CalendarDayMain, MarkingStyles } from './CalendarDayMain'
import { NewDayComponentProps } from './CalendarTypes'

export const CalendarDay = (
  p: NewDayComponentProps & MarkingStyles & { ignoreDarkMode?: true }
) => {
  const { validPeriodStyles } = useCalendarPeriodStyles()
  return (
    <Box alignItems="center" position="relative">
      <CalendarDayMain {...p} styles={p.styles ?? validPeriodStyles} />
      <CalendarDayDots marking={p.marking} />
    </Box>
  )
}
