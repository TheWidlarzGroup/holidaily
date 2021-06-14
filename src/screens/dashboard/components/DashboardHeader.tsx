import React, { FC } from 'react'
import { Box, Text, BaseOpacity } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import IconProfile from 'assets/icons/icon-profile.svg'
import IconBell from 'assets/icons/icon-bell.svg'
import { useNavigation, DrawerActions } from '@react-navigation/native'

export const DashboardHeader: FC = () => {
  const { t } = useTranslation('dashboard')

  const navigation = useNavigation()

  return (
    <Box marginBottom="m" flexDirection="row" justifyContent="space-between" alignItems="center">
      <Box flexDirection="row" alignItems="center" justifyContent="flex-start">
        <BaseOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          bg="white"
          padding="xs"
          paddingLeft="m"
          borderTopRightRadius="lplus"
          borderBottomRightRadius="lplus">
          <IconProfile width={50} height={50} />
        </BaseOpacity>
        <Text variant="boldBlack18" paddingLeft="xm">
          {t('welcome')}
        </Text>
      </Box>
      <BaseOpacity padding="m">
        <IconBell />
      </BaseOpacity>
    </Box>
  )
}
