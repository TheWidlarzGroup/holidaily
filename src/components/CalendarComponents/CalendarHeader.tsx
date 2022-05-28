import React from 'react'
import { Box, Text, Theme } from 'utils/theme'
import { getMonthName } from 'utils/dates'
import { TouchableOpacity } from 'react-native'

type CalendarHeaderProps = {
  date: Date
  onHeaderPressed?: F0
  ignoreDarkmode?: true
}

export const CalendarHeader = (p: CalendarHeaderProps) => {
  const monthName = getMonthName(p.date.getMonth())
  const year = p.date.getFullYear()
  const headerFontColor: keyof Theme['colors'] = p.ignoreDarkmode ? 'alwaysBlack' : 'black'
  return (
    <TouchableOpacity onPress={p.onHeaderPressed}>
      <Box margin="xm" flexDirection="row" alignItems="center">
        <Text variant="textSM" textAlign="center" color={headerFontColor}>
          {monthName} {year}
        </Text>
      </Box>
    </TouchableOpacity>
  )
}
