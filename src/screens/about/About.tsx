import React from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import GestureRecognizer from 'react-native-swipe-gestures'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { DrawerNavigationType } from 'navigation/types'
import { Box, mkUseStyles, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { AboutDescription } from './components/AboutDescription'
import { AboutHeader } from './components/AboutHeader'
import { AboutLinks } from './components/AboutLinks'
import { version } from '../../../package.json'

export const About = () => {
  const styles = useStyles()
  const navigation = useNavigation<DrawerNavigationType<'ABOUT'>>()
  const handleGoBack = () => {
    navigation.goBack()
    navigation.dispatch(DrawerActions.openDrawer())
  }
  const containerStyle = [styles.container, styles.containerPadding]
  return (
    <SafeAreaWrapper isDefaultBgColor={false}>
      <GestureRecognizer onSwipeRight={handleGoBack} style={containerStyle}>
        <AboutHeader onClose={handleGoBack} />
        <AboutDescription />
        <AboutLinks />
        <Version />
      </GestureRecognizer>
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

const useStyles = mkUseStyles(() => ({
  container: {
    flexGrow: 1,
  },
  containerPadding: {
    paddingTop: 16,
  },
  containerMargin: {
    marginTop: -24,
  },
}))
