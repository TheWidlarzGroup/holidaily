import React from 'react'
import { Box, Text } from 'utils/theme'
import { HolidayDetails } from 'types/holidaysDataTypes'
import { useTranslation } from 'react-i18next'
import { displayDatesRange } from 'utils/functions'

import IconSickLeave from 'assets/icons/icon-sick-leave.svg'

export const MateHoliday = (props: Required<HolidayDetails>) => {
  const { isOnHoliday, dayStart, dayEnd } = props
  const { t, i18n } = useTranslation('dashboard')

  const header = isOnHoliday ? 'outOfWorkNow' : 'outOfWorkSoon'
  const colorHeader = isOnHoliday ? 'tertiary' : 'headerGrey'
  const color = isOnHoliday ? 'tertiary' : 'black'
  return (
    <Box borderBottomColor="black" borderBottomWidth={2} paddingBottom="l">
      <Text variant="inputErrorMessage" marginVertical="m" color={colorHeader}>
        {t(header).toUpperCase()}
      </Text>
      <Text variant="header" textAlign="left" color={color}>
        Description
      </Text>
      <Text variant="regularGrey16" color={color} marginTop="s" marginBottom="xs">
        {displayDatesRange(dayStart, dayEnd, i18n.language)}
      </Text>
      <Box flexDirection="row" alignItems="center">
        <IconSickLeave />
        <Text variant="inputErrorMessage" paddingLeft="xs" color={color}>
          {t('SickLeave')}
        </Text>
      </Box>
    </Box>
  )
}
