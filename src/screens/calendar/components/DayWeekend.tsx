import React from 'react'
import { useTranslation } from 'react-i18next'
import { getDateWithMonthString, getDayName } from 'utils/dates'
import { Box, Text } from 'utils/theme'
import { weekendBasedStyles } from '../utils'

type DayWeekendProps = { date: string; weekend: number }

export const DayWeekend = ({ date, weekend }: DayWeekendProps) => {
  const { i18n } = useTranslation()

  return (
    <Box
      paddingVertical="m"
      paddingHorizontal="lplus"
      borderColor="white"
      backgroundColor="disabled"
      justifyContent="space-between"
      flexDirection="row"
      style={weekendBasedStyles(weekend)}>
      <Text variant="regularWhite12">{getDateWithMonthString(date, i18n.language)}</Text>
      <Text variant="boldWhite12">{getDayName(date, i18n.language)}</Text>
    </Box>
  )
}
