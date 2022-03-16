import React from 'react'
import { Box, mkUseStyles, Text } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import IconClose from 'assets/icons/icon-close2.svg'
import IconBack from 'assets/icons/icon-back2.svg'
import { TouchableOpacity } from 'react-native'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import FastImage from 'react-native-fast-image'
import { AuthRoutes } from 'navigation/types'
import { StackScreenProps } from '@react-navigation/stack'

const manImgSrc = require('assets/Splash_screen.png')
const waveImgSrc = require('assets/Wave.png')

type AboutTypes = StackScreenProps<AuthRoutes, 'About'>

export const About = ({ route }: AboutTypes) => {
  const isFromWelcomeScreen = route?.params
  const navigation = useNavigation()
  const { t } = useTranslation('welcome')
  const styles = useStyles()

  const handleGoBack = () => {
    navigation.goBack()
    if (!isFromWelcomeScreen) {
      navigation.dispatch(DrawerActions.openDrawer())
    }
  }

  const welcomeScreenStyles = isFromWelcomeScreen
    ? { marginTop: 'm', borderTopLeftRadius: 'l', borderTopRightRadius: 'l' }
    : null
  return (
    <SafeAreaWrapper isDefaultBgColor isDarkBgColor={!!isFromWelcomeScreen}>
      <Box backgroundColor="white" paddingTop="m" flexGrow={1} {...welcomeScreenStyles}>
        <Box
          justifyContent="space-between"
          alignItems="center"
          flexDirection="row"
          paddingBottom="xxl"
          paddingHorizontal="m">
          <TouchableOpacity
            onPress={handleGoBack}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
            {isFromWelcomeScreen ? (
              <IconClose height={15} width={15} />
            ) : (
              <IconBack height={18} width={18} />
            )}
          </TouchableOpacity>
          <Box>
            <Text variant="boldBlackCenter20">{t('about')}</Text>
          </Box>
          <Box paddingRight="l" />
        </Box>
        <Box justifyContent="space-between" flex={1}>
          <Box paddingHorizontal="m" paddingBottom="xxxl">
            <Text textAlign="left">
              <Text variant="body1Bold" color="primary">
                {t('aboutDesc1Part1')}
              </Text>
              <Text variant="body1">{t('aboutDesc1Part2')}</Text>
              <Text variant="body1Bold">{t('aboutDesc1Part3')}</Text>
              <Text variant="body1">{t('aboutDesc1Part4')}</Text>
              <Text variant="body1Bold">{t('aboutDesc1Part5')}</Text>
            </Text>
            <Text textAlign="left" marginTop="l">
              <Text variant="body1Bold">{t('aboutDesc2Part1')}</Text>
              <Text variant="body1">{t('aboutDesc2Part2')}</Text>
              <Text variant="body1Bold">{t('aboutDesc2Part3')}</Text>
            </Text>
          </Box>
          <Box flex={1} alignItems="center" justifyContent="center">
            <FastImage style={styles.manImage} source={manImgSrc} resizeMode="contain" />
            <FastImage style={styles.waveImage} source={waveImgSrc} resizeMode="contain" />
          </Box>
        </Box>
      </Box>
    </SafeAreaWrapper>
  )
}

const useStyles = mkUseStyles(() => ({
  manImage: {
    height: '100%',
    width: '70%',
    zIndex: 10,
  },
  waveImage: {
    aspectRatio: 1,
    width: '100%',
    position: 'absolute',
    bottom: -80,
  },
}))
