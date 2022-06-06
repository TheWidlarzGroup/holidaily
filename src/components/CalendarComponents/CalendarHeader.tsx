import React from 'react'
import { Box, Text, Theme } from 'utils/theme'
import { getMonthName } from 'utils/dates'
import { TouchableOpacity } from 'react-native'

type CalendarHeaderProps = {
  ignoreDarkmode?: true
  date: Date
  onHeaderPressed?: F0
}

export const CalendarHeader = (p: CalendarHeaderProps) => {
  const monthName = getMonthName(p.date.getMonth())
  const year = p.date.getFullYear()
  const fontColor: keyof Theme['colors'] = p.ignoreDarkmode ? 'alwaysBlack' : 'black'
  return (
    <TouchableOpacity onPress={p.onHeaderPressed}>
      <Box margin="xm" flexDirection="row" alignItems="center">
        <Text variant="textSM" color={fontColor}>
          {monthName}
        </Text>
        <Text variant="textSM" marginLeft="s" color={fontColor}>
          {year}
        </Text>
      </Box>
    </TouchableOpacity>
  )
}
