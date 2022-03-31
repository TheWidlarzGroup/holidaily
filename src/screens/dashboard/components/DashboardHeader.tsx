import React from 'react'
import { Box, Text, BaseOpacity } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { Avatar } from 'components/Avatar'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { useIsDrawerOpen } from '@react-navigation/drawer'
import { useUserContext } from 'hooks/useUserContext'
import { getDayName } from 'utils/dates'
import { formatDate } from 'utils/formatDate'
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
            <Avatar src={user?.photo} />
          </BaseOpacity>
        </Box>

        <Box alignItems="center" flex={1}>
          <Text variant="boldBlack18">{t('welcome', { name: user?.firstName })}</Text>
          <Text variant="lightGreyRegular" lineHeight={14}>
            {t('today', {
              date,
            })}
          </Text>
        </Box>
        <NotificationsBell unseenCount={2} />
      </Box>
    </Box>
  )
}
