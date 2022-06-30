import React from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { DrawerNavigationType } from 'navigation/types'
import { Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { useRecognizeSwipe } from 'hooks/useRecognizeSwipe'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { AboutDescription } from './components/AboutDescription'
import { AboutHeader } from './components/AboutHeader'
import { AboutLinks } from './components/AboutLinks'
import { version } from '../../../package.json'

const AnimatedBox = Animated.createAnimatedComponent(Box)

export const About = () => {
  const navigation = useNavigation<DrawerNavigationType<'ABOUT'>>()
  const handleGoBack = () => {
    navigation.goBack()
    navigation.dispatch(DrawerActions.openDrawer())
  }
  const { onTouchStart, onTouchMove } = useRecognizeSwipe(handleGoBack)

  return (
    <SafeAreaWrapper isDefaultBgColor={false}>
      <PanGestureHandler onBegan={onTouchStart} onActivated={onTouchMove}>
        <AnimatedBox paddingTop="m" flex={1}>
          <AboutHeader onClose={handleGoBack} />
          <AboutDescription />
          <AboutLinks />
          <Version />
        </AnimatedBox>
      </PanGestureHandler>
    </SafeAreaWrapper>
  )
}

const Version = () => {
  const { t } = useTranslation('about')
  return (
    <Box position="absolute" bottom={10} left="40%">
      <Text variant="textXS" color="darkGreyBrighter">
        {`${t('version')} ${version}`}
      </Text>
    </Box>
  )
}
