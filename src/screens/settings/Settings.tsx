import React, { useCallback } from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DrawerNavigationType } from 'navigation/types'
import { Box } from 'utils/theme'
import { useNavigation } from '@react-navigation/native'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { useTranslation } from 'react-i18next'
import { useBooleanState } from 'hooks/useBooleanState'
import { LoadingModal } from 'components/LoadingModal'
import { Language } from './components/Language'
import { DarkMode } from './components/DarkMode'
import { BiometricPasscode } from './components/BiometricPasscode'

export const Settings = () => {
  const navigation = useNavigation<DrawerNavigationType<'Settings'>>()
  const [loading, { setTrue: setLoadingTrue, setFalse: setLoadingFalse }] = useBooleanState(false)

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
        <Language setLoadingFalse={setLoadingFalse} setLoadingTrue={setLoadingTrue} />
      </Box>
      <LoadingModal show={loading} />
    </SafeAreaWrapper>
  )
}
