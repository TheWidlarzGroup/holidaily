import React from 'react'
import { Box, Text } from 'utils/theme'
import { getMonthName } from 'utils/dates'
import { useTranslation } from 'react-i18next'

export const CalendarHeader = ({ date }: { date: Date }) => {
  const { i18n } = useTranslation()
  const monthName = getMonthName(date.getMonth() + 1, i18n.language)
  return (
    <Box margin="xm">
      <Text fontFamily="Nunito-Bold" fontSize={15}>
        {monthName}
      </Text>
    </Box>
  )
}
