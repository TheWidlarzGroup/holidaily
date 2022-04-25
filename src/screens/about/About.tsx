import React, { useEffect } from 'react'
import { Box } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { isIos } from 'utils/layout'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { BackHandler } from 'react-native'
import { AboutDescription } from './components/AboutDescription'
import { AboutBackground } from './components/AboutBackground'
import { AboutHeader } from './components/AboutHeader'
import { AboutLinks } from './components/AboutLinks'

type AboutTypes = { isFromWelcomeScreen?: true; closeModal: F0 }

export const About = ({ isFromWelcomeScreen, closeModal }: AboutTypes) => {
  const navigation = useNavigation()

  useEffect(() => {
    if (isFromWelcomeScreen) return
    const backAction = () => {
      navigation.goBack()
      navigation.dispatch(DrawerActions.openDrawer())
      return true
    }

    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction)
  }, [isFromWelcomeScreen, navigation])

  return (
    <SafeAreaWrapper isDefaultBgColor={isFromWelcomeScreen || false}>
      <Box
        backgroundColor="white"
        paddingTop={isFromWelcomeScreen ? 0 : 'm'}
        marginTop={isIos && isFromWelcomeScreen ? '-l' : 0}
        flexGrow={1}>
        <AboutHeader closeModal={closeModal} isFromWelcomeScreen={isFromWelcomeScreen} />
        <Box justifyContent="space-between" flex={1}>
          <AboutDescription />
          <AboutLinks />
          <AboutBackground />
        </Box>
      </Box>
    </SafeAreaWrapper>
  )
}
