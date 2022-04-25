import React, { useCallback } from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { isIos } from 'utils/layout'
import GestureRecognizer from 'react-native-swipe-gestures'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { DrawerNavigationType } from 'navigation/types'
import { Box, mkUseStyles } from 'utils/theme'
import { AboutDescription } from './components/AboutDescription'
import { AboutBackground } from './components/AboutBackground'
import { AboutHeader } from './components/AboutHeader'
import { AboutLinks } from './components/AboutLinks'

type AboutTypes = { isFromWelcomeScreen?: true; closeModal: F0 }

export const About = ({ isFromWelcomeScreen, closeModal }: AboutTypes) => {
  const styles = useStyles()
  const navigation = useNavigation<DrawerNavigationType<'About'>>()
  const handleGoBack = useCallback(() => {
    if (isFromWelcomeScreen) return
    navigation.goBack()
    navigation.dispatch(DrawerActions.openDrawer())
  }, [isFromWelcomeScreen, navigation])

  return (
    <SafeAreaWrapper isDefaultBgColor={isFromWelcomeScreen || false}>
      <GestureRecognizer
        onSwipeRight={handleGoBack}
        style={[
          styles.container,
          !isFromWelcomeScreen && styles.containerPadding,
          isIos && isFromWelcomeScreen && styles.containerMargin,
        ]}>
        <AboutHeader closeModal={closeModal} isFromWelcomeScreen={isFromWelcomeScreen} />
        <Box justifyContent="space-between" flex={1}>
          <AboutDescription />
          <AboutLinks />
          <AboutBackground />
        </Box>
      </GestureRecognizer>
    </SafeAreaWrapper>
  )
}

const useStyles = mkUseStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.white,
    flexGrow: 1,
  },
  containerPadding: {
    paddingTop: 16,
  },
  containerMargin: {
    marginTop: -24,
  },
}))
