import React from 'react'
import { Box, Text } from 'utils/theme'
import { TouchableOpacity } from 'react-native'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import IconBack from 'assets/icons/icon-back.svg'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useFetchNotifications } from 'dataAccess/queries/useFetchNotifications'
import { LoadingModal } from 'components/LoadingModal'
import { NotificationsList } from './components/NotificationsList'

export const Notifications = () => {
  const { goBack } = useNavigation()
  const { t } = useTranslation('notifications')
  const { isLoading, data } = useFetchNotifications()
  console.log(data)
  return (
    <SafeAreaWrapper isTabNavigation edges={['left', 'right', 'bottom']}>
      <Box
        paddingVertical="lplus"
        backgroundColor="disabledText"
        borderBottomRightRadius="lmin"
        borderBottomLeftRadius="lmin"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <TouchableOpacity onPress={goBack}>
          <IconBack />
        </TouchableOpacity>
        <Text variant="header">{t('header')}</Text>
        <Box paddingRight="xl" />
      </Box>
      <Box alignItems="flex-end" paddingVertical="m" paddingHorizontal="xm">
        <Text variant="bold15" color="greyDark">
          {t('markAllAsSeen')}
        </Text>
        {data?.notifications && <NotificationsList data={data.notifications} />}
        <LoadingModal show={isLoading} />
      </Box>
    </SafeAreaWrapper>
  )
}
