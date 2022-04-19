import { useUserContext } from 'hooks/useUserContext'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme/index'

type TakenPtoSummaryProps = {
  ptoTaken: number
  wasSent?: true
}

export const TakenPtoSummary = ({ ptoTaken, wasSent }: TakenPtoSummaryProps) => {
  const { t } = useTranslation('requestVacation')
  const { user } = useUserContext()
  const ptoLeft = useMemo(() => {
    if (!user) return ''
    if (wasSent) return user.availablePto
    return user.availablePto - ptoTaken
  }, [user, wasSent, ptoTaken])
  return (
    <Box flexDirection="row" justifyContent="space-around" alignItems="center">
      <Box alignItems="center">
        <TakenPtoSummaryText>{t('ptoTaken1')}</TakenPtoSummaryText>
        <Text variant="heading1">{ptoTaken}</Text>
        <TakenPtoSummaryText>{t('ptoTaken2')}</TakenPtoSummaryText>
      </Box>
      <Box alignItems="center">
        <TakenPtoSummaryText>{t('ptoLeft1')}</TakenPtoSummaryText>
        <Text variant="heading1">{ptoLeft}</Text>
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
