import React, { useMemo } from 'react'
import { Box, Text, BaseOpacity } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { Avatar } from 'components/Avatar'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { useIsDrawerOpen } from '@react-navigation/drawer'
import { useUserContext } from 'hooks/useUserContext'
import { getDayName } from 'utils/dates'
import { formatDate } from 'utils/formatDate'
import { useFetchNotifications } from 'dataAccess/queries/useFetchNotifications'
import { getCurrentLocale } from 'utils/locale'
import { NotificationsBell } from './NotificationsBell'

export const DashboardHeader = () => {
  const { t } = useTranslation('dashboard')
  const navigation = useNavigation()
  const { user } = useUserContext()
  const date = `${formatDate(
    new Date(),
    'dayNumeralLongMonthNoYear',
    getCurrentLocale()
  )} (${getDayName(new Date())})`

  const isDrawerOpen = useIsDrawerOpen()
  const { data } = useFetchNotifications()
  const unseenCount = useMemo(() => {
    if (!data) return 0
    return data.notifications.filter((n) => !n.wasSeenByHolder).length
  }, [data])
  return (
    <Box marginVertical="m" flexDirection="row" justifyContent="space-between" alignItems="center">
      <Box flexDirection="row" alignItems="center" justifyContent="flex-start">
        <Box opacity={isDrawerOpen ? 0 : 1} position="absolute">
          <BaseOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            bg="white"
            padding="xs"
            paddingLeft="m"
            borderTopRightRadius="lplus"
            borderBottomRightRadius="lplus">
            <Avatar size="s" src={user?.photo} />
          </BaseOpacity>
        </Box>

        <Box alignItems="center" flex={1}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ maxWidth: '60%' }}
            variant="boldBlack18">
            {t('welcome', { name: user?.firstName })}
          </Text>
          <Text variant="lightGreyRegular" lineHeight={14}>
            {t('today', {
              date,
            })}
          </Text>
        </Box>
        <NotificationsBell unseenCount={unseenCount} />
      </Box>
    </Box>
  )
}
