import React from 'react'
import { DayOffRequest } from 'mockApi/models'
import { Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'

type RequestFooterProps = {
  isSick: boolean
  status: DayOffRequest['status']
}

const LINE_HEIGHT = 21

export const RequestFooter = (props: RequestFooterProps) => {
  const { t } = useTranslation('seeRequest')

  return (
    <Box marginTop="l">
      <Box flexDirection="row" justifyContent="flex-start">
        <Text variant="textSM" color="darkGreyBrighter" lineHeight={LINE_HEIGHT}>
          {t('sent')}
        </Text>
        <Text variant="textSM" color="blackDarker" lineHeight={LINE_HEIGHT} marginLeft="xs">
          1 Apr 2022
        </Text>
      </Box>

      {(props.isSick ||
        (props.isSick && props.status === 'past') ||
        props.status === 'accepted') && (
        <Box flexDirection="row" justifyContent="flex-start" marginTop="xs">
          <Text variant="textSM" color="darkGreyBrighter" lineHeight={LINE_HEIGHT}>
            {t('acceptedAt')}
          </Text>
          <Text variant="textSM" color="blackDarker" lineHeight={LINE_HEIGHT} marginLeft="xs">
            {props.isSick && props.status !== 'past' ? `${t('automatically')}` : '1 Apr 2022'}
          </Text>
        </Box>
      )}
    </Box>
  )
}
