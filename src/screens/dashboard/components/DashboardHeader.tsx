import React, { useMemo } from 'react'
import { BaseOpacity, Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { Avatar } from 'components/Avatar'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { useDrawerProgress } from '@react-navigation/drawer'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { formatDate } from 'utils/formatDate'
import { useFetchNotifications } from 'dataAccess/queries/useFetchNotifications'
import { getCurrentLocale } from 'utils/locale'
import { makeUserDetails } from 'utils/userDetails'
import { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { AnimatedBox } from 'components/AnimatedBox'
import { NotificationsBell } from './NotificationsBell'

export const DashboardHeader = () => {
  const { t } = useTranslation('dashboard')
  const navigation = useNavigation()
  const { user } = useUserContext()
  const date = `${formatDate(new Date(), 'dayNumeralLongMonthNoYear', getCurrentLocale())}`
  const { data } = useFetchNotifications()
  const progress = useDrawerProgress() as Readonly<SharedValue<number>>

  const animatedBoxStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [1, 0]),
  }))

  const unseenCount = useMemo(() => {
    if (!data) return 0
    return data.notifications.filter((n) => !n.wasSeenByHolder).length
  }, [data])
  return (
    <Box marginVertical="m" flexDirection="row" alignItems="center">
      <BaseOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        position="absolute"
        zIndex="10">
        <AnimatedBox
          style={animatedBoxStyle}
          bg="white"
          padding="s"
          paddingLeft="m"
          borderTopRightRadius="lplus"
          borderBottomRightRadius="lplus">
          <Avatar size="m" src={user?.photo} userDetails={makeUserDetails(user)} />
        </AnimatedBox>
      </BaseOpacity>
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
  )
}
