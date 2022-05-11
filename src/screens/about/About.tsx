import React, { useCallback } from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { isIos } from 'utils/layout'
import GestureRecognizer from 'react-native-swipe-gestures'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { DrawerNavigationType } from 'navigation/types'
import { Box, mkUseStyles, Text } from 'utils/theme'
import { ModalHandleIndicator } from 'components/ModalHandleIndicator'
import { CustomButton } from 'components/CustomButton'
import { useTranslation } from 'react-i18next'
import { AboutDescription } from './components/AboutDescription'
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
  const containerStyle = [
    styles.container,
    !isFromWelcomeScreen && styles.containerPadding,
    isIos && isFromWelcomeScreen && styles.containerMargin,
  ]
  return (
    <SafeAreaWrapper isDefaultBgColor={isFromWelcomeScreen || false}>
      <GestureRecognizer onSwipeRight={handleGoBack} style={containerStyle}>
        <AboutHeader closeModal={closeModal} isFromWelcomeScreen={isFromWelcomeScreen} />
        {isFromWelcomeScreen && <ModalHandleIndicator />}
        <AboutDescription />
        {!isFromWelcomeScreen && <AboutLinks />}
        <Version show={!isFromWelcomeScreen} />
        <Box paddingBottom="l">
          {isFromWelcomeScreen && (
            <CustomButton label={t('aboutButton')} variant="primary" onPress={closeModal} />
          )}
        </Box>
      </GestureRecognizer>
    </SafeAreaWrapper>
  )
}

const Version = ({ show }: { show: boolean }) => {
  const { t } = useTranslation('about')
  if (show)
    return (
      <Box position="absolute" bottom={10} left="40%">
        <Text variant="textXS" color="darkGreyBrighter">
          {`${t('version')} ${version}`}
        </Text>
      </Box>
    )
  return null
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
