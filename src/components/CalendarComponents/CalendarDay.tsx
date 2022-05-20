import { TextProps } from '@shopify/restyle'
import React from 'react'
import { Box, Theme } from 'utils/theme'
import { CalendarDayDots } from './CalendarDayDots'
import { CalendarDayMain, MarkingStyles } from './CalendarDayMain'
import { NewDayComponentProps } from './CalendarTypes'

export const CalendarDay = (
  p: NewDayComponentProps & MarkingStyles & { dayTextColor?: TextProps<Theme>['color'] }
) => (
  <Box alignItems="center" position="relative">
    <CalendarDayMain {...p} />
    <CalendarDayDots marking={p.marking} />
  </Box>
)
