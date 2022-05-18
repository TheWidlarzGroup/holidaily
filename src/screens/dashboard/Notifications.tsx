import React, { useLayoutEffect } from 'react'
import { Box, Text, useTheme } from 'utils/theme'
import { TouchableOpacity } from 'react-native'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import IconBack from 'assets/icons/icon-back2.svg'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useFetchNotifications } from 'dataAccess/queries/useFetchNotifications'
import { LoadingModal } from 'components/LoadingModal'
import { useRouteContext } from 'hooks/useRouteContext'
import { NotificationsList } from './components/NotificationsList'

export const Notifications = () => {
  const theme = useTheme()
  const route = useRoute()
  const isFocused = useIsFocused()
  const { goBack } = useNavigation()
  const { t } = useTranslation('notifications')
  const { isLoading, data } = useFetchNotifications()
  const { setCurrentRoute } = useRouteContext()

  useLayoutEffect(() => {
    if (isFocused) {
      setCurrentRoute(route.name)
    }
    return () => setCurrentRoute('')
  }, [route, setCurrentRoute, isFocused])

  return (
    <SafeAreaWrapper edges={['left', 'right', 'bottom']}>
      <Box
        paddingVertical="lplus"
        backgroundColor="veryLightGrey"
        borderBottomRightRadius="lmin"
        borderBottomLeftRadius="lmin"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingLeft="m">
        <TouchableOpacity onPress={goBack} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
          <IconBack height={16} width={10} color={theme.colors.black} />
        </TouchableOpacity>
        <Text variant="body1">{t('header')}</Text>
        <Box paddingRight="l" />
      </Box>
      <Box alignItems="flex-end" paddingVertical="m" paddingHorizontal="xm">
        {data?.notifications && <NotificationsList data={data.notifications} />}
        <LoadingModal show={isLoading} />
      </Box>
    </SafeAreaWrapper>
  )
}
