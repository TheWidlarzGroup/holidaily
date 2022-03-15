import React from 'react'
import { Box, mkUseStyles, Text } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import IconClose from 'assets/icons/icon-close2.svg'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import FastImage from 'react-native-fast-image'

export const WelcomeAbout = () => {
  const { t } = useTranslation('welcome')
  const styles = useStyles()
  const manImgSrc = require('assets/Splash_screen.png')
  const waveImgSrc = require('assets/Wave.png')

  const { goBack } = useNavigation()

  return (
    <SafeAreaWrapper isDefaultBgColor>
      <Box
        marginTop="m"
        paddingTop="m"
        backgroundColor="white"
        flexGrow={1}
        borderTopLeftRadius="l"
        borderTopRightRadius="l">
        <Box
          justifyContent="space-between"
          alignItems="center"
          flexDirection="row"
          paddingBottom="xxl"
          paddingTop="s"
          paddingHorizontal="m">
          <TouchableOpacity onPress={goBack}>
            <IconClose height={15} width={15} />
          </TouchableOpacity>
          <Box>
            <Text variant="boldBlackCenter20">{t('about')}</Text>
          </Box>
          <Box paddingRight="l" />
        </Box>
        <Box justifyContent="space-between" flex={1}>
          <Box paddingHorizontal="m" paddingBottom="xxxl">
            <Text variant="body1" textAlign="left">
              {t('appDescritption1')}
            </Text>
            <Text variant="body1" textAlign="left" marginTop="m">
              {t('appDescritption2')}
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
