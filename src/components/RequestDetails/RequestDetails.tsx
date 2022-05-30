import React from 'react'
import { ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme'
import { DayOffRequest } from 'mock-api/models'
import { useUserSettingsContext } from 'hooks/context-hooks/useUserSettingsContext'
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
      </Box>
    </ScrollView>
  )
}

const getIconStatus = (status: DayOffRequest['status']): IconStatus => {
  if (status === 'accepted') return 'success'
  if (status === 'cancelled') return 'error'
  return status
}
