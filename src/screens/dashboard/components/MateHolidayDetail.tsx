import React from 'react'
import { Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { displayDayShort, setDateToBeDisplayed, displayWeekday } from 'utils/functions'

type MateHolidayDetailProps = {
  type: 'start' | 'end'
  date: string
}

export const MateHolidayDetail = (props: MateHolidayDetailProps) => {
  const { date, type } = props
  const { t, i18n } = useTranslation('dashboard')
  const header = type === 'start' ? 'lastDayAtWork' : 'backAtWork'
  const dateTobedisplay =
    type === 'start' ? setDateToBeDisplayed(date, false) : setDateToBeDisplayed(date, true)
  const color = type === 'start' ? 'greyDark' : 'black'

  return (
    <Box flexBasis="50%">
      <Text variant="inputErrorMessage" marginVertical="m" color="headerGrey">
        {t(header).toUpperCase()}
      </Text>
      <Text variant="bold20" color={color}>
        {displayDayShort(dateTobedisplay, i18n.language)}
      </Text>
      <Text variant="regularGrey16" color={color}>
        {displayWeekday(dateTobedisplay, i18n.language)}
      </Text>
    </Box>
  )
}
