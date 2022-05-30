import React from 'react'
import { ScrollView } from 'react-native'
import { Trans, useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme'
import { DayOffRequest } from 'mock-api/models'
import { calculatePTO, getDurationInDays } from 'utils/dates'
import { useUserSettingsContext } from 'hooks/useUserSettingsContext'
import { useUserContext } from 'hooks/useUserContext'
import { RequestDetailsHeader } from './RequestDetailsHeader'
import { RequestAttachments } from './RequestAttachments'
import { CircleStatusIcon, IconStatus } from '../CircleStatusIcon'

type RequestDetailsProps = {
  attachments?: DayOffRequest['attachments']
  showStatus?: true
  wasSent?: true
}

export const RequestDetails = (
  p: Omit<DayOffRequest, 'id' | 'user' | 'isOnHoliday'> & RequestDetailsProps
) => {
  const { userSettings } = useUserSettingsContext()
  const { t } = useTranslation('seeRequest')
  const iconStatus = getIconStatus(p.status)
  const topOpacity = userSettings?.darkMode ? 0 : 0.3
  const bgColor = userSettings?.darkMode ? 'white' : 'primary' // TODO: create color in colors and replace below

  return (
    <ScrollView style={{ flex: 1 }}>
      {!!p.showStatus && (
        <Box bg={bgColor}>
          <Box
            position="absolute"
            height="100%"
            width="100%"
            bg="white"
            opacity={topOpacity}
            alignItems="center"
            justifyContent="center"
            zIndex="-1"
          />
          <Box padding="m" flexDirection="row" alignItems="center">
            <CircleStatusIcon status={iconStatus} />
            <Text variant="body1Bold">{t(p.status)}</Text>
          </Box>
        </Box>
      )}
      <Box>
        <RequestDetailsHeader
          startDate={p.startDate}
          endDate={p.endDate}
          description={p.description}
          message={p.message}
        />
        <RequestAttachments attachments={p.attachments} />
        <PtoLeft ptoTaken={calculatePTO(p.startDate, p.endDate)} />
      </Box>
    </ScrollView>
  )
}

const PtoLeft = (p: { ptoTaken: number }) => {
  const { user } = useUserContext()
  const availablePto = (user?.availablePto ?? 0) - p.ptoTaken
  return (
    <Box padding="m" bg="attachmentBg" borderRadius="l1min">
      <Text variant="textSM">
        <Trans
          ns="requestVacation"
          i18nKey="ptoLeft"
          components={{ b: <Text variant="textBoldSM" /> }}
          values={{ days: getDurationInDays(availablePto) }}
        />
      </Text>
    </Box>
  )
}

const getIconStatus = (status: DayOffRequest['status']): IconStatus => {
  if (status === 'accepted') return 'success'
  if (status === 'cancelled') return 'error'
  return status
}
