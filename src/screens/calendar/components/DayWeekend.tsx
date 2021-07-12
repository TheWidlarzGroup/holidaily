import React from 'react'
import { getDateWithMonthString, getDayName } from 'utils/dates'
import { Box, Text } from 'utils/theme'
import { weekendBasedStyles } from '../utils'

type DayWeekendProps = { date: string; weekend: number }

export const DayWeekend = ({ date, weekend }: DayWeekendProps) => (
  <Box
    paddingVertical="m"
    paddingHorizontal="lplus"
    borderColor="white"
    backgroundColor="disabled"
    justifyContent="space-between"
    flexDirection="row"
    style={weekendBasedStyles(weekend)}>
    <Text variant="regularWhite12">{getDateWithMonthString(date)}</Text>
    <Text variant="boldWhite12">{getDayName(date)}</Text>
  </Box>
)
