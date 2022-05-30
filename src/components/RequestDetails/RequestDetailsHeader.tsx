import React from 'react'
import { Box, Text } from 'utils/theme/index'
import { calculatePTO, getDurationInDays, getFormattedPeriod } from 'utils/dates'
import { useTranslation } from 'react-i18next'

type RequestDetailsHeaderProps = {
  description?: string
  startDate?: Date | string
  endDate?: Date | string
  message?: string
}

export const RequestDetailsHeader = (p: RequestDetailsHeaderProps) => {
  if (typeof p.startDate === 'string') p.startDate = new Date(p.startDate)
  if (typeof p.endDate === 'string') p.endDate = new Date(p.endDate)
  const { t } = useTranslation('requestVacation')

  return (
    <Box>
      <Text variant="heading4">{p.description || t('timeOffDescriptionPlaceholder')}</Text>
      {p.startDate && (
        <>
          <Box paddingVertical="s">
            <Text variant="textSM">
              {getFormattedPeriod(p.startDate, p.endDate)}{' '}
              {(p.endDate ?? p.startDate).getFullYear()}
            </Text>
          </Box>
          <Text variant="textBoldXS">
            {t('ptoTaken', {
              days: getDurationInDays(calculatePTO(p.startDate, p.endDate ?? p.startDate)),
            })}
          </Text>
          {!!p.message && (
            <Text variant="regular15" paddingTop="m">
              {p.message}
            </Text>
          )}
        </>
      )}
    </Box>
  )
}
