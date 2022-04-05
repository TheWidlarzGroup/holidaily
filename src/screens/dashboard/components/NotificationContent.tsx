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
  endDate: Date | undefined
  isSeen: boolean
}

export const NotificationContent = (p: NotificationContentProps) => {
  const { t } = useTranslation('notifications')
  return (
    <Box flexDirection={'row'} justifyContent="space-between">
      <Box flex={1} padding="m">
        <Text>
          {/* @ts-ignore   trans component causes "Type instantiation is excessively deep and possibly infinite." in pipeline, but not in VSCode */}
          <Trans
            ns="notifications"
            i18nKey={p.type}
            values={{
              author: `${p.firstName} ${p.lastName}`,
              endDate: p.endDate
                ? formatDate(p.endDate, 'dayNumeralLongMonthNoYear', getCurrentLocale())
                : undefined,
            }}
            components={{ b: <Text variant={'bold16'} lineHeight={20} /> }}
          />
        </Text>
      </Box>
      {!p.isSeen && (
        <Box
          backgroundColor="black"
          borderTopRightRadius="lmin"
          borderBottomLeftRadius="lmin"
          paddingVertical="xs"
          paddingHorizontal="m"
          height={32}
          justifyContent="center"
          alignItems="center">
          <Text variant="boldWhite12" paddingBottom="xs">
            {t('new')}
          </Text>
        </Box>
      )}
    </Box>
  )
}
