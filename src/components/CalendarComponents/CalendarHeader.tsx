import React from 'react'
import { Box, Text } from 'utils/theme'
import { getMonthName } from 'utils/dates'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'

export const CalendarHeader = ({ date, onHeaderPressed }: { date: Date; onHeaderPressed?: F0 }) => {
  const { i18n } = useTranslation()
  const monthName = getMonthName(date.getMonth() + 1, i18n.language)
  const year = date.getFullYear()
  return (
    <TouchableOpacity onPress={onHeaderPressed}>
      <Box margin="xm" flexDirection="row" alignItems="center">
        <Text variant="bold16" lineHeight={20}>
          {monthName}
        </Text>
        <Text variant="captionText" lineHeight={20} marginLeft="s">
          {year}
        </Text>
      </Box>
    </TouchableOpacity>
  )
}
