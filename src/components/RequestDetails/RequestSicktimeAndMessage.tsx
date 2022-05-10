import React from 'react'
import { Box, Text } from 'utils/theme/index'
import PillIcon from 'assets/icons/pill.svg'
import { useTranslation } from 'react-i18next'

type RequestSicktimeAndMessageProps = {
  isSick: boolean
  message?: string
}

export const RequestSicktimeAndMessage = ({ isSick, message }: RequestSicktimeAndMessageProps) => {
  const { t } = useTranslation('requestVacation')
  return (
    <>
      {isSick && (
        <Box flexDirection="row" alignItems="center">
          <PillIcon />
          <Text variant="body1">{t('sickTimeTitle')}</Text>
        </Box>
      )}
      {!!message && (
        <Text variant="regular15" paddingTop="m" paddingHorizontal="s">
          {message}
        </Text>
      )}
    </>
  )
}
