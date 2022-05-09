import React, { useCallback } from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DrawerNavigationType } from 'navigation/types'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import GestureRecognizer from 'react-native-swipe-gestures'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { useTranslation } from 'react-i18next'
import { useBooleanState } from 'hooks/useBooleanState'
import { Box, mkUseStyles } from 'utils/theme'
import { LoadingModal } from 'components/LoadingModal'
import { isIos } from 'utils/layout'
import { Language } from './components/Language'
import { Siri } from './components/Siri'
import { DarkModeSwitch } from './components/DarkModeSwitch'

export const Settings = () => {
  const styles = useStyles()
  const navigation = useNavigation<DrawerNavigationType<'Settings'>>()
  const [loading, { setTrue: setLoadingTrue, setFalse: setLoadingFalse }] = useBooleanState(false)

  const handleGoBack = useCallback(() => {
    navigation.goBack()
    navigation.dispatch(DrawerActions.openDrawer())
  }, [navigation])

  const { t } = useTranslation('settings')

  return (
    <SafeAreaWrapper>
      <GestureRecognizer onSwipeRight={handleGoBack} style={{ flex: 1, ...styles.container }}>
        <DrawerBackArrow goBack={handleGoBack} title={t('name')} />
        <Box marginHorizontal="m" flex={1}>
          <DarkModeSwitch />
          {/* <BiometricPasscode /> */}
          <Language setLoadingFalse={setLoadingFalse} setLoadingTrue={setLoadingTrue} />
          {isIos && <Siri />}
        </Box>
        <LoadingModal show={loading} />
      </GestureRecognizer>
    </SafeAreaWrapper>
  )
}

const useStyles = mkUseStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.dashboardBackground,
  },
}))
