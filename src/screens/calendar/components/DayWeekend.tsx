import React from 'react'
import { getDateWithMonthString, getDayName } from 'utils/dates'
import { Box, Text, useTheme } from 'utils/theme'
import { weekendBasedStyles } from 'utils/calendarUtils'

type DayWeekendProps = { date: string; weekend: number }

export const DayWeekend = ({ date, weekend }: DayWeekendProps) => {
  const theme = useTheme()
  return (
    <Box
      paddingVertical="m"
      paddingHorizontal="lplus"
      borderColor="white"
      backgroundColor="disabled"
      justifyContent="space-between"
      flexDirection="row"
      style={weekendBasedStyles(weekend, theme)}>
      <Text variant="regularWhite12">{getDateWithMonthString(date)}</Text>
      <Text variant="boldWhite12">{getDayName(date)}</Text>
    </Box>
  )
}
