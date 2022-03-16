import React from 'react'
import { Box, Text } from 'utils/theme'
import { Trans, useTranslation } from 'react-i18next'

export const NotificationContent = ({
  type,
  firstName,
  lastName,
  endDate,
  isSeen,
}: {
  type: string
  firstName: string
  lastName: string
  endDate: string | undefined
  isSeen: boolean
}) => {
  const { t } = useTranslation('notifications')
  return (
    <Box flexDirection={'row'} justifyContent="space-between">
      <Box flex={1} padding="m">
        <Text>
          <Trans
            ns="notifications"
            i18nKey={type}
            values={{
              author: `${firstName} ${lastName}`,
              endDate,
            }}
            components={{ b: <Text variant={'bold16'} lineHeight={20} /> }}
          />
        </Text>
      </Box>
      {!isSeen && (
        <Box
          backgroundColor="black"
          borderTopRightRadius="lmin"
          borderBottomLeftRadius="lmin"
          paddingVertical="xs"
          paddingHorizontal="m"
          height={32}>
          <Text variant="boldWhite12">{t('new')}</Text>
        </Box>
      )}
    </Box>
  )
}
