import { useUserContext } from 'hooks/useUserContext'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme/index'

export const TakenPtoSummary = ({ ptoTaken }: { ptoTaken: number }) => {
  const { t } = useTranslation('requestVacation')
  const { user } = useUserContext()
  return (
    <Box flexDirection="row" justifyContent="space-around" alignItems="center">
      <Box alignItems="center">
        <TakenPtoSummaryText>{t('ptoTaken1')}</TakenPtoSummaryText>
        <Text variant="heading1">{ptoTaken}</Text>
        <TakenPtoSummaryText>{t('ptoTaken2')}</TakenPtoSummaryText>
      </Box>
      <Box alignItems="center">
        <TakenPtoSummaryText>{t('ptoLeft1')}</TakenPtoSummaryText>
        <Text variant="heading1">{user ? user.availablePto - ptoTaken : ''}</Text>
        <TakenPtoSummaryText>{t('ptoLeft2')}</TakenPtoSummaryText>
      </Box>
    </Box>
  )
}

const TakenPtoSummaryText: React.FC = (props) => (
  <Text variant="captionText" textTransform="uppercase">
    {props.children}
  </Text>
)
