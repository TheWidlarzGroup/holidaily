import React from 'react'
import { Box, Text } from 'utils/theme'
import { Trans, useTranslation } from 'react-i18next'
import { Notification } from 'mockApi/models'
import { formatDate } from 'utils/formatDate'
import { getCurrentLocale } from 'utils/locale'

type NotificationContentProps = {
  type: Notification['type']
  firstName: string
  lastName: string
  isSeen: boolean
  endDate?: Date
  description?: string
}

export const NotificationContent = (p: NotificationContentProps) => {
  const { t } = useTranslation('notifications')
  return (
    <Box flexDirection="row" justifyContent="space-between">
      <Box flex={1} padding="m">
        <Text variant="textSM" lineHeight={21} color="blackBrighter" marginBottom="-s">
          <Trans
            ns="notifications"
            i18nKey={p.type}
            values={{
              author: `${p.firstName} ${p.lastName}`,
              description: p.description ? p.description : undefined,
              endDate: p.endDate
                ? formatDate(p.endDate, 'dayNumeralLongMonthNoYear', getCurrentLocale())
                : undefined,
            }}
            components={{ b: <Text /> }}
          />
        </Text>
      </Box>
      {!p.isSeen && (
        <Box
          backgroundColor="special"
          borderTopRightRadius="lmin"
          borderBottomLeftRadius="lmin"
          height={21}
          width={48}
          justifyContent="center"
          alignItems="center">
          <Text variant="boldWhite12" paddingBottom="xs" color="veryLightGrey">
            {t('new')}
          </Text>
        </Box>
      )}
    </Box>
  )
}
