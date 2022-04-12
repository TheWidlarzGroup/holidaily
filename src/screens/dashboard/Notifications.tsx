import React from 'react'
import { BaseOpacity, Box, Text } from 'utils/theme'
import { TouchableOpacity } from 'react-native'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import IconBack from 'assets/icons/icon-back2.svg'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useFetchNotifications } from 'dataAccess/queries/useFetchNotifications'
import { LoadingModal } from 'components/LoadingModal'
import { useMarkNotificationAsSeen } from 'dataAccess/mutations/useMarkNotificationAsSeen'
import { NotificationsList } from './components/NotificationsList'

export const Notifications = () => {
  const { goBack } = useNavigation()
  const { t } = useTranslation('notifications')
  const { isLoading, data } = useFetchNotifications()
  const { mutate } = useMarkNotificationAsSeen()
  const markAllAsSeen = () => {
    if (!data) return
    data.notifications.forEach((n) => mutate(n.id))
  }

  return (
    <SafeAreaWrapper isTabNavigation edges={['left', 'right', 'bottom']}>
      <Box
        paddingVertical="lplus"
        backgroundColor="disabledText"
        borderBottomRightRadius="lmin"
        borderBottomLeftRadius="lmin"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingLeft="m">
        <TouchableOpacity onPress={goBack} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
          <IconBack height={18} width={18} />
        </TouchableOpacity>
        <Text variant="header">{t('header')}</Text>
        <Box paddingRight="l" />
      </Box>
      <Box alignItems="flex-end" paddingVertical="m" paddingHorizontal="xm">
        <BaseOpacity onPress={markAllAsSeen}>
          <Text variant="bold15" color="greyDark">
            {t('markAllAsSeen')}
          </Text>
        </BaseOpacity>
        {data?.notifications && <NotificationsList data={data.notifications} />}
        <LoadingModal show={isLoading} />
      </Box>
    </SafeAreaWrapper>
  )
}
