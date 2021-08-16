import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme/index'

export const SummaryDays = () => {
  const { t } = useTranslation('requestVacation')

  return (
    <Box flexDirection="row" justifyContent="space-around" alignItems="center">
      <Box alignItems="center">
        <SummaryDaysText>{t('ptoTaken1')}</SummaryDaysText>
        <Text variant="heading1">3</Text>
        <SummaryDaysText>{t('ptoTaken2')}</SummaryDaysText>
      </Box>
      <Box alignItems="center">
        <SummaryDaysText>{t('ptoLeft1')}</SummaryDaysText>
        <Text variant="heading1">19</Text>
        <SummaryDaysText>{t('ptoLeft2')}</SummaryDaysText>
      </Box>
    </Box>
  )
}

const SummaryDaysText: React.FC = (props) => (
  <Text variant="captionText" textTransform="uppercase">
    {props.children}
  </Text>
)
