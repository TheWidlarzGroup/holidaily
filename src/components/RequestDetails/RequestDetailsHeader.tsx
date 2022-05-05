import React from 'react'
import { Box, Text } from 'utils/theme/index'
import { getFormattedPeriod } from 'utils/dates'
import CalendarIcon from 'assets/icons/icon-calendar.svg'
import { useTranslation } from 'react-i18next'

type RequestDetailsHeaderProps = {
  description?: string
  startDate?: Date | string
  endDate?: Date | string
}

export const RequestDetailsHeader = ({
  description,
  startDate,
  endDate,
}: RequestDetailsHeaderProps) => {
  if (typeof startDate === 'string') startDate = new Date(startDate)
  if (typeof endDate === 'string') endDate = new Date(endDate)
  const { t } = useTranslation('requestVacation')
  return (
    <>
      <Box paddingLeft="s">
        <Text variant="heading4">{description || t('timeOffDescriptionPlaceholder')}</Text>
      </Box>
      <Box flexDirection="row" alignItems="center">
        <CalendarIcon />
        <Text variant="body1Bold">{getFormattedPeriod(startDate, endDate)}</Text>
      </Box>
    </>
  )
}
