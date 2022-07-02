import React from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { DrawerNavigationType } from 'navigation/types'
import { Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { GestureRecognizer } from 'utils/GestureRecognizer'
import { AboutDescription } from './components/AboutDescription'
import { AboutHeader } from './components/AboutHeader'
import { AboutLinks } from './components/AboutLinks'
import { version } from '../../../package.json'

export const About = () => {
  const navigation = useNavigation<DrawerNavigationType<'ABOUT'>>()
  const handleGoBack = () => {
    navigation.goBack()
    navigation.dispatch(DrawerActions.openDrawer())
  }

  return (
    <SafeAreaWrapper isDefaultBgColor={false}>
      <GestureRecognizer onSwipeRight={handleGoBack}>
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
