import React from 'react'
import { Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { displayDatesRange } from 'utils/functions'

import IconSickLeave from 'assets/icons/icon-sick-leave.svg'
import { User } from 'mock-api/models/mirageTypes'

export const MateHoliday = ({ user }: { user: User }) => {
  const { startDate, endDate, isSickTime, description } = user.requests[0]
  const { isOnHoliday } = user
  const { t } = useTranslation('dashboard')

  const header = isOnHoliday ? 'outOfWorkNow' : 'outOfWorkSoon'
  const colorHeader = isOnHoliday ? 'tertiary' : 'headerGrey'
  const color = isOnHoliday ? 'tertiary' : 'black'
  return (
    <Box borderBottomColor="black" borderBottomWidth={2} paddingBottom="l">
      <Text variant="inputErrorMessage" marginVertical="m" color={colorHeader}>
        {t(header).toUpperCase()}
      </Text>
      <Text variant="header" textAlign="left" color="black">
        {description || t('coupleDaysOff')}
      </Text>
      <Text variant="regularGrey16" color="black" marginTop="s" marginBottom="xs">
        {startDate && endDate && displayDatesRange(startDate, endDate)}
      </Text>
      {isSickTime && (
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
