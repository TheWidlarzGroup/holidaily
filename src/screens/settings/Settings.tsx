import React, { FC, useCallback } from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'

import { DrawerNavigationType } from 'navigation/types'
import { Box, Text } from 'utils/theme'
import { useNavigation } from '@react-navigation/native'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { Language } from './components/Language'
import { DarkMode } from './components/DarkMode'
import { BiometricPasscode } from './components/BiometricPasscode'
import { useTranslation } from 'react-i18next'

export const Settings: FC = () => {
  const navigation = useNavigation<DrawerNavigationType<'Settings'>>()

  const handleGoBack = useCallback(() => {
    navigation.navigate('Home', {
      screen: 'DashboardNavigation',
      params: {
        screen: 'Dashboard',
      },
    })
  }, [navigation])

  const { t } = useTranslation('settings')

  return (
    <SafeAreaWrapper>
      <DrawerBackArrow goBack={handleGoBack} title={t('name')} />
      <Box marginHorizontal="m" flex={1}>
        <DarkMode />
        <BiometricPasscode />
        <Language />
      </Box>
    </SafeAreaWrapper>
  )
}
