import React from 'react'
import { Box, Text } from 'utils/theme'
import { TouchableOpacity } from 'react-native'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'

import IconBack from 'assets/icons/icon-back.svg'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { Notification } from 'types/useFetchNotificationsTypes'
import { NotificationsList } from './components/NotificationsList'

const photo = require('assets/User_Picture_Placeholder.png')

const notifications: Notification[] = [
  {
    id: '0',
    isSeen: false,
    type: 'like',
    createdAt: new Date(Date.now() - 20000).toISOString(),
    author: {
      id: '0',
      firstName: 'June',
      lastName: 'Osbourne',
      photo,
    },
  },
  {
    id: '1',
    isSeen: false,
    type: 'comment',
    createdAt: new Date(Date.now() - 30000).toISOString(),
    author: {
      id: '1',
      firstName: 'Peter',
      lastName: 'Kansas',
      photo,
    },
  },
  {
    id: '2',
    isSeen: true,
    type: 'dayOff',
    endDate: new Date(Date.now() + 138000).toISOString(),
    createdAt: new Date(Date.now() - 38000).toISOString(),
    author: {
      id: '2',
      firstName: 'Peter',
      lastName: 'Kansas',
      photo,
    },
  },
]

export const Notifications = () => {
  const { goBack } = useNavigation()
  const { t } = useTranslation('notifications')
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
        <Text variant="header">{'title'}</Text>
        <Box paddingRight="xl" />
      </Box>
      <Box alignItems="flex-end" paddingVertical="m" paddingHorizontal="xm">
        <Text variant="bold15" color="greyDark">
          {t('markAllAsSeen')}
        </Text>
        <NotificationsList data={notifications} />
      </Box>
    </SafeAreaWrapper>
  )
}
