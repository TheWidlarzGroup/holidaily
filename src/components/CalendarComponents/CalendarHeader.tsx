import React from 'react'
import { BaseOpacity, Box, Text } from 'utils/theme'
import { getMonthName } from 'utils/dates'

type CalendarHeaderProps = {
  date: Date
  onHeaderPressed?: F0
}

export const CalendarHeader = (p: CalendarHeaderProps) => {
  const monthName = getMonthName(p.date.getMonth())
  const year = p.date.getFullYear()

  return (
    <BaseOpacity onPress={p.onHeaderPressed} activeOpacity={p.onHeaderPressed ? 0.8 : 1}>
      <Box margin="xm" flexDirection="row" alignItems="center">
        <Text variant="textSM" color="black">
          {monthName}
        </Text>
        <Text variant="textSM" marginLeft="s" color="black">
          {year}
        </Text>
      </Box>
    </BaseOpacity>
  )
}
