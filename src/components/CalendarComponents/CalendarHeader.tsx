import React from 'react'
import { BaseOpacity, Box, Text, Theme } from 'utils/theme'
import { getMonthName } from 'utils/dates'

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
    <BaseOpacity onPress={p.onHeaderPressed} activeOpacity={p.onHeaderPressed ? 0.8 : 1}>
      <Box margin="xm" flexDirection="row" alignItems="center">
        <Text variant="textSM" color={fontColor}>
          {monthName}
        </Text>
        <Text variant="textSM" marginLeft="s" color={fontColor}>
          {year}
        </Text>
      </Box>
    </BaseOpacity>
  )
}
