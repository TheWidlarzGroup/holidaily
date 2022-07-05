import React, { useCallback } from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DrawerNavigationType } from 'navigation/types'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { useTranslation } from 'react-i18next'
import { useBooleanState } from 'hooks/useBooleanState'
import { Box } from 'utils/theme'
import { LoadingModal } from 'components/LoadingModal'
import { isIos } from 'utils/layout'
import Animated from 'react-native-reanimated'
import { useRecognizeSwipe } from 'hooks/useRecognizeSwipe'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { DarkModeSwitch } from './components/DarkModeSwitch'
import { Language } from './components/Language'
import { Siri } from './components/Siri'

const AnimatedBox = Animated.createAnimatedComponent(Box)

export const Settings = () => {
  const { t } = useTranslation('settings')
  const navigation = useNavigation<DrawerNavigationType<'SETTINGS'>>()
  const [loading, { setTrue: setLoadingTrue, setFalse: setLoadingFalse }] = useBooleanState(false)

  const handleGoBack = useCallback(() => {
    navigation.goBack()
    navigation.dispatch(DrawerActions.openDrawer())
  }, [navigation])

  const { onTouchStart, onTouchMove } = useRecognizeSwipe(handleGoBack)

  return (
    <SafeAreaWrapper>
      <PanGestureHandler onBegan={onTouchStart} onActivated={onTouchMove}>
        <AnimatedBox flex={1}>
          <DrawerBackArrow goBack={handleGoBack} title={t('name')} />
          <Box marginHorizontal="m">
            <DarkModeSwitch />
            {/* <BiometricPasscode /> */}
            <Language setLoadingFalse={setLoadingFalse} setLoadingTrue={setLoadingTrue} />
            {isIos && <Siri />}
          </Box>
        </AnimatedBox>
      </PanGestureHandler>
      <LoadingModal show={loading} />
    </SafeAreaWrapper>
  )
}
