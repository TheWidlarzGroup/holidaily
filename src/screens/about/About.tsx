import React, { useCallback } from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { isIos } from 'utils/layout'
import GestureRecognizer from 'react-native-swipe-gestures'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { DrawerNavigationType } from 'navigation/types'
import { Box, mkUseStyles, Text } from 'utils/theme'
import { Indicator } from 'components/Indicator'
import { CustomButton } from 'components/CustomButton'
import { useTranslation } from 'react-i18next'
import { AboutDescription } from './components/AboutDescription'
import { AboutBackground } from './components/AboutBackground'
import { AboutHeader } from './components/AboutHeader'
import { AboutLinks } from './components/AboutLinks'
import { version } from '../../../package.json'

type AboutTypes = { isFromWelcomeScreen?: true; closeModal: F0 }

export const About = ({ isFromWelcomeScreen, closeModal }: AboutTypes) => {
  const styles = useStyles()
  const navigation = useNavigation<DrawerNavigationType<'About'>>()
  const { t } = useTranslation('welcome')
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
        {isFromWelcomeScreen && <Indicator />}
        <Box justifyContent="space-between" flex={1}>
          <AboutDescription />
          {!isFromWelcomeScreen && <AboutLinks />}
          {!isFromWelcomeScreen && <AboutBackground />}
        </Box>
        <Box position="absolute" bottom={25} left="40%">
          {!isFromWelcomeScreen && (
            <Text fontSize={10} color="black">
              v. {version} Holidaily
            </Text>
          )}
        </Box>
        <Box>
          <CustomButton
            label={t('aboutButton')}
            variant="primary"
            onPress={isFromWelcomeScreen ? closeModal : handleGoBack}
          />
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
