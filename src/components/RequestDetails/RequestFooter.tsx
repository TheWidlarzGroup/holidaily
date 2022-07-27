import React from 'react'
import { DayOffRequest } from 'mockApi/models'
import { Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { parseISO, addDays, sub, isAfter, isSameDay } from 'date-fns'
import { getDateWithMonthString, getReversedDateWithMonthString } from 'utils/dates'

type RequestFooterProps = {
  isSick: boolean
  startDay: string
  createdAt: string
  status: DayOffRequest['status']
}

const LINE_HEIGHT = 21

export const RequestFooter = (props: RequestFooterProps) => {
  const { t } = useTranslation('seeRequest')

  const startDay = parseISO(props.startDay)
  const createdDay = parseISO(props.createdAt)
  const sentDate =
    isAfter(createdDay, startDay) || isSameDay(createdDay, startDay)
      ? sub(createdDay, { days: 2 })
      : createdDay
  const acceptDate = addDays(sentDate, 1)
  const mockedAcceptedDate = getDateWithMonthString(acceptDate)

  const isAccepted = props.status === 'past' || props.status === 'accepted'
  const acceptedMessage =
    props.isSick && props.status !== 'past' ? `${t('automatically')}` : mockedAcceptedDate

  return (
    <Box marginTop="l">
      <Box flexDirection="row" justifyContent="flex-start">
        <Text variant="textSM" color="darkGreyBrighter" lineHeight={LINE_HEIGHT}>
          {t('sent')}
        </Text>
        <Text variant="textSM" color="blackDarker" lineHeight={LINE_HEIGHT} marginLeft="xs">
          {getReversedDateWithMonthString(sentDate)}
        </Text>
      </Box>

      {isAccepted && (
        <Box flexDirection="row" justifyContent="flex-start" marginTop="xs">
          <Text variant="textSM" color="darkGreyBrighter" lineHeight={LINE_HEIGHT}>
            {t('acceptedAt')}
          </Text>
          <Text variant="textSM" color="blackDarker" lineHeight={LINE_HEIGHT} marginLeft="xs">
            {acceptedMessage}
          </Text>
        </Box>
      )}
    </Box>
  )
}
