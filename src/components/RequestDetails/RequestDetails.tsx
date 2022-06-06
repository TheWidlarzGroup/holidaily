import React, { useRef } from 'react'
import { ScrollView } from 'react-native'
import { Trans, useTranslation } from 'react-i18next'
import { Box, Text, Theme, useTheme } from 'utils/theme'
import { DayOffRequest } from 'mock-api/models'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { calculatePTO, getDurationInDays } from 'utils/dates'
import { ResponsiveValue } from '@shopify/restyle'
import { RequestDetailsHeader } from './RequestDetailsHeader'
import { RequestAttachments } from './RequestAttachments'
import { CircleStatusIcon, IconStatus } from '../CircleStatusIcon'
import { RequestFooter } from './RequestFooter'

type RequestDetailsProps = {
  attachments?: DayOffRequest['attachments']
  showStatus?: true
  source?: string
  wasSent?: true
}

export const RequestDetails = (
  p: Omit<DayOffRequest, 'id' | 'user' | 'isOnHoliday'> & RequestDetailsProps
) => {
  const theme = useTheme()
  const { t } = useTranslation('seeRequest')
  const iconStatus = getIconStatus(p.status)
  const topOpacity = p.status === 'past' ? 0.7 : 0.8
  const showPtoLeft = !!p.startDate && !!p.endDate && !p.wasSent && !p.isSickTime

  const statusColor = getStatusColor(p.status)
  const pastIconColor = p.status === 'past' ? theme.colors.white : theme.colors.alwaysWhite

  return (
    <ScrollView>
      {!!p.showStatus && (
        <Box bg={statusColor} borderRadius="lmin">
          <Box
            position="absolute"
            height="100%"
            width="100%"
            bg="white"
            opacity={topOpacity}
            zIndex="-1"
          />
          <Box height={56} flexDirection="row" alignItems="center">
            <CircleStatusIcon
              status={iconStatus}
              iconProps={{ color: pastIconColor, height: 12 }}
              source="SEE_REQUEST"
            />
            <Text variant="textBoldSM" color={statusColor}>
              {t(p.status)}
            </Text>
            {p.isSickTime && (
              <Box
                position="absolute"
                top={0}
                right={0}
                backgroundColor="quarternaryDarken"
                borderTopRightRadius="lmin"
                borderBottomLeftRadius="lmin"
                justifyContent="center"
                alignItems="center">
                <Text
                  variant="boldWhite12"
                  lineHeight={14}
                  marginHorizontal="xm"
                  marginVertical="xs"
                  color="veryLightGrey">
                  {t('sickLeave')}
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      )}
      <Box margin="m">
        <RequestDetailsHeader
          startDate={p.startDate}
          endDate={p.endDate}
          description={p.description}
          message={p.message}
        />
        <RequestAttachments attachments={p.attachments} />
        {!!p.showStatus && (
          <RequestFooter
            status={p.status}
            isSick={p.isSickTime}
            startDay={p.startDate}
            createdAt={p.createdAt}
          />
        )}
      </Box>
      {showPtoLeft && <PtoLeft ptoTaken={calculatePTO(p.startDate, p.endDate)} />}
    </ScrollView>
  )
}

const PtoLeft = (p: { ptoTaken: number }) => {
  const { user } = useUserContext()
  // Comment: ref, because once assigned, we don't want this number to change when we reduce availablePto by submitting request
  const availablePto = useRef((user?.availablePto ?? 0) - p.ptoTaken)
  return (
    <Box padding="m" bg="attachmentBg" borderRadius="l1min" marginTop="l">
      <Text variant="textSM">
        <Trans
          ns="requestVacation"
          i18nKey="ptoLeft"
          components={{ b: <Text variant="textBoldSM" /> }}
          values={{ days: getDurationInDays(availablePto.current) }}
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

const getStatusColor = (
  status: DayOffRequest['status']
): ResponsiveValue<keyof Theme['colors'], Theme> => {
  if (status === 'past') return 'headerGrey'
  if (status === 'pending') return 'special'
  if (status === 'accepted') return 'approvedGreen'
  return 'errorBrighter'
}
