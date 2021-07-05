import React from 'react'
import { Box, Text } from 'utils/theme'
import { HolidayDetails, HolidayDetailsOptional } from 'types/holidaysDataTypes'
import { useTranslation } from 'react-i18next'
import { displayDatesRange } from 'utils/functions'

import IconSickLeave from 'assets/icons/icon-sick-leave.svg'

export const MateHoliday = (props: Required<HolidayDetails> & HolidayDetailsOptional) => {
  const { isOnHoliday, dayStart, dayEnd, sickLeave, description } = props
  const { t } = useTranslation('dashboard')

  const header = isOnHoliday ? 'outOfWorkNow' : 'outOfWorkSoon'
  const colorHeader = isOnHoliday ? 'tertiary' : 'headerGrey'
  const color = isOnHoliday ? 'tertiary' : 'black'
  return (
    <Box borderBottomColor="black" borderBottomWidth={2} paddingBottom="l">
      <Text variant="inputErrorMessage" marginVertical="m" color={colorHeader}>
        {t(header).toUpperCase()}
      </Text>
      <Text variant="header" textAlign="left" color={color}>
        {description || t('coupleDaysOff')}
      </Text>
      <Text variant="regularGrey16" color={color} marginTop="s" marginBottom="xs">
        {displayDatesRange(dayStart, dayEnd)}
      </Text>
      {sickLeave && (
        <Box flexDirection="row" alignItems="center">
          <IconSickLeave />
          <Text variant="inputErrorMessage" paddingLeft="xs" color={color}>
            {t('sickLeave')}
          </Text>
        </Box>
      )}
    </Box>
  )
}
