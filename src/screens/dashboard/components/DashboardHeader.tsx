import React, { FC } from 'react'
import { Box, Text, BaseOpacity } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import IconProfile from 'assets/icons/icon-profile.svg'
import IconBell from 'assets/icons/icon-bell.svg'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { useUserContext } from 'hooks/useUserContext'

export const DashboardHeader: FC = () => {
  const { t } = useTranslation('dashboard')

  const { user } = useUserContext()

  const navigation = useNavigation()

  return (
    <Box marginVertical="m" flexDirection="row" justifyContent="space-between" alignItems="center">
      <BaseOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        bg="white"
        padding="xs"
        paddingLeft="m"
        borderTopRightRadius="lplus"
        borderBottomRightRadius="lplus">
        <IconProfile width={50} height={50} />
      </BaseOpacity>
      <Box justifyContent="center" alignItems="center">
        <Text variant="boldBlack18" textAlign="center" paddingLeft="xm">
          {t('hello')} {user?.firstName}
        </Text>
        <Text variant="lightGreyRegular" textAlign="center" paddingLeft="xm">
          {t('todayIs')} {t('day')}
        </Text>
      </Box>
      <BaseOpacity padding="m">
        <IconBell />
      </BaseOpacity>
    </Box>
  )
}
