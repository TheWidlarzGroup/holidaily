import React from 'react'
import { Box, Text, useTheme } from 'utils/theme'
import { getMonthName } from 'utils/dates'

export const CalendarHeader = ({ date }: { date: Date }) => {
  const monthName = getMonthName(date.getMonth())
  const year = date.getFullYear()
  const { fontSize } = useTheme()
  return (
    <Box margin="xm" flexDirection="row" alignItems="flex-end">
      <Text variant="bold16" color="black" marginRight="s">
        {monthName}
      </Text>
      <Text fontSize={fontSize.xs} lineHeight={14} color="black">
        {year}
      </Text>
    </Box>
  )
}
