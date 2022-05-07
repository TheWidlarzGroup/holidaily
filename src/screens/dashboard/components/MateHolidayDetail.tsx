import React from 'react'
import { Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { displayDayShort, displayWeekday, prevWorkday, nextWorkday } from 'utils/functions'

type MateHolidayDetailProps = {
  type: 'start' | 'end'
  date: string
}

export const MateHolidayDetail = (props: MateHolidayDetailProps) => {
  const { date, type } = props
  const { t } = useTranslation('dashboard')
  const header = type === 'start' ? 'lastDayAtWork' : 'backAtWork'
  const dateTobedisplay = type === 'start' ? prevWorkday(date) : nextWorkday(date)

  return (
    <Box flexBasis="50%">
      <Text variant="inputErrorMessage" marginVertical="m" color="headerGrey">
        {t(header).toUpperCase()}
      </Text>
      <Text variant="bold20" color="alwaysWhite">
        {displayDayShort(dateTobedisplay)}
      </Text>
      <Text variant="regularGrey16" color="alwaysDarkenWhite">
        {displayWeekday(dateTobedisplay)}
      </Text>
    </Box>
  )
}
