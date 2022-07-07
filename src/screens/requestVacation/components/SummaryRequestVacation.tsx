import React from 'react'
import { Box, Text, useTheme } from 'utils/theme/index'
import { useTranslation } from 'react-i18next'
import { RequestDetails } from 'components/RequestDetails/RequestDetails'
import IconPill from 'assets/icons/icon-pill.svg'
import { isIos } from 'utils/layout'

type SummaryRequestVacationProps = {
  description: string
  isSick: boolean
  onNextPressed: F0
  startDate?: Date
  endDate?: Date
  createdAt?: Date
  message?: string
  attachments?: { id: string; uri: string }[]
  hideNext?: boolean
}

export const SummaryRequestVacation = (p: SummaryRequestVacationProps) => (
  <Box flex={1} paddingHorizontal="m" paddingBottom={isIos ? 'ml' : 'none'}>
    {p.isSick && <SickTimeInfo />}
    <RequestDetails
      source="ADD_REQUEST"
      description={p.description}
      message={p.message ?? ''}
      attachments={p.attachments}
      startDate={(p.startDate ?? new Date()).toISOString()}
      endDate={(p.endDate ?? new Date()).toISOString()}
      createdAt={(p.createdAt ?? new Date()).toISOString()}
      isSickTime={p.isSick}
      status={p.isSick ? 'accepted' : 'pending'}
    />
  </Box>
)

const SickTimeInfo = () => {
  const { t } = useTranslation('requestVacation')
  const theme = useTheme()

  return (
    <Box
      bg="quarternaryOpaque"
      padding="m"
      marginVertical="s"
      borderRadius="l1min"
      flexDirection="row"
      alignItems="center">
      <IconPill color={theme.colors.quarternary} />
      <Text variant="textSM" marginLeft="s" marginRight="m">
        {t('sickDayDescription')}
      </Text>
    </Box>
  )
}
