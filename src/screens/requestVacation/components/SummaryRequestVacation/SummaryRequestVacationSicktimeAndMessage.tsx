import React from 'react'
import { Box, Text } from 'utils/theme/index'
import PillIcon from 'assets/icons/pill.svg'
import { useTranslation } from 'react-i18next'

type SummaryRequestVacationSicktimeAndMessageProps = {
  sickTime: boolean
  message?: string
}

export const SummaryRequestVacationSicktimeAndMessage = ({
  sickTime,
  message,
}: SummaryRequestVacationSicktimeAndMessageProps) => {
  const { t } = useTranslation('requestVacation')
  return (
    <>
      {sickTime && (
        <Box flexDirection="row" alignItems="center">
          <PillIcon />
          <Text variant="body1">{t('sickTimeTitle')}</Text>
        </Box>
      )}
      {!!message && (
        <Text variant="regular15" paddingTop="m">
          {message}
        </Text>
      )}
    </>
  )
}
