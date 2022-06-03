import React from 'react'
import { Box, Text } from 'utils/theme'
import { getMonthName } from 'utils/dates'
import { TouchableOpacity } from 'react-native'

export const CalendarHeader = ({ date, onHeaderPressed }: { date: Date; onHeaderPressed?: F0 }) => {
  const monthName = getMonthName(date.getMonth())
  const year = date.getFullYear()
  return (
    <TouchableOpacity onPress={onHeaderPressed}>
      <Box margin="xm" flexDirection="row" alignItems="center">
        <Text variant="textSM" color="alwaysBlack">
          {monthName}
        </Text>
        <Text variant="textSM" marginLeft="s" color="alwaysBlack">
          {year}
        </Text>
      </Box>
    </TouchableOpacity>
  )
}
