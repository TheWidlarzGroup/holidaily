import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme/index'

export const SummaryDays = () => {
  const { t } = useTranslation('requestVacation')

  return (
    <Box flexDirection="row" justifyContent="space-around" alignItems="center">
      <Box alignItems="center">
        <Text variant="captionText">{t('ptoTaken1').toUpperCase()}</Text>
        <Text variant="heading1">3</Text>
        <Text variant="captionText">{t('ptoTaken2').toUpperCase()}</Text>
      </Box>
      <Box alignItems="center">
        <Text variant="captionText">{t('ptoLeft1').toUpperCase()}</Text>
        <Text variant="heading1">19</Text>
        <Text variant="captionText">{t('ptoLeft2').toUpperCase()}</Text>
      </Box>
    </Box>
  )
}
