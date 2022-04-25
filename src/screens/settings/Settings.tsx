import React, { useCallback } from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DrawerNavigationType } from 'navigation/types'
import { Box } from 'utils/theme'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { useTranslation } from 'react-i18next'
import { useBooleanState } from 'hooks/useBooleanState'
import { useBackToDrawerOnBackPress } from 'hooks/useBackToDrawerOnBackPress'
import { LoadingModal } from 'components/LoadingModal'
import { isIos } from 'utils/layout'
import { Language } from './components/Language'
import { Siri } from './components/Siri'

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
    navigation.dispatch(DrawerActions.openDrawer())
  }, [navigation])

  const { t } = useTranslation('settings')

  useBackToDrawerOnBackPress()

  return (
    <SafeAreaWrapper>
      <DrawerBackArrow goBack={handleGoBack} title={t('name')} />
      <Box marginHorizontal="m" flex={1}>
        {/* <DarkModeSwitch /> */}
        {/* <BiometricPasscode /> */}
        <Language setLoadingFalse={setLoadingFalse} setLoadingTrue={setLoadingTrue} />
        {isIos && <Siri />}
      </Box>
      <LoadingModal show={loading} />
    </SafeAreaWrapper>
  )
}
