import React from 'react'
import { Box, Text } from 'utils/theme'
import { getMonthName } from 'utils/dates'

export const CalendarHeader = ({ date }: { date: Date }) => {
  const monthName = getMonthName(date.getMonth())
  return (
    <Box margin="xm">
      <Text variant="boldBlack18">{monthName}</Text>
    </Box>
  )
}
