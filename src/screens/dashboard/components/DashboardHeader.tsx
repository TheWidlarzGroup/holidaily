import React, { useMemo } from 'react'
import { Box, Text, BaseOpacity } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { Avatar } from 'components/Avatar'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { useIsDrawerOpen } from '@react-navigation/drawer'
import { useUserContext } from 'hooks/useUserContext'
import { formatDate } from 'utils/formatDate'
import { useFetchNotifications } from 'dataAccess/queries/useFetchNotifications'
import { getCurrentLocale } from 'utils/locale'
import { makeUserDetails } from 'utils/userDetails'
import { NotificationsBell } from './NotificationsBell'

export const DashboardHeader = () => {
  const { t } = useTranslation('dashboard')
  const navigation = useNavigation()
  const { user } = useUserContext()
  const date = `${formatDate(new Date(), 'dayNumeralLongMonthNoYear', getCurrentLocale())}`

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
            padding="s"
            paddingLeft="m"
            borderTopRightRadius="lplus"
            borderBottomRightRadius="lplus">
            <Avatar size="m" src={user?.photo} userDetails={makeUserDetails(user)} />
          </BaseOpacity>
        </Box>
        <Box alignItems="center" flex={1}>
          <Text variant="textXS" color="titleActive" lineHeight={16}>
            {t('today')}
          </Text>
          <Text variant="textBoldMD" color="black" lineHeight={21}>
            {date}
          </Text>
        </Box>
        <NotificationsBell unseenCount={unseenCount} />
      </Box>
    </Box>
  )
}
