import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { AppNavigationType } from 'navigation/types'
import { Box, Text } from 'utils/theme'
import { ModalProvider } from 'contexts/ModalProvider'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'

export const Requests = () => {
  const navigation = useNavigation<AppNavigationType<'DrawerNavigator'>>()
  const { t } = useTranslation('adminPanel')

  const handleGoBack = useCallback(() => {
    navigation.navigate('Home', {
      screen: 'DashboardNavigation',
      params: {
        screen: 'Dashboard',
      },
    })
  }, [navigation])

  return (
    <ModalProvider>
      <SafeAreaWrapper>
        <DrawerBackArrow goBack={handleGoBack} title={'Requests'} />
      </SafeAreaWrapper>
    </ModalProvider>
  )
}
