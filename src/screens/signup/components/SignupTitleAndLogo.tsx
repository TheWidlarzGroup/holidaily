import React from 'react'
import { useTranslation } from 'react-i18next'
import { Image } from 'react-native'
import { Box, mkUseStyles, Text } from 'utils/theme'

const logoSrc = require('assets/Logo.png')

export const SignupTitleAndLogo = () => {
  const { t } = useTranslation(['signup'])
  const styles = useStyles()

  return (
    <Box flex={1} justifyContent="space-evenly" alignItems="center">
      <Text variant="title1" fontSize={24} marginVertical="l" marginHorizontal="xxl">
        {t('signupTitle')}
      </Text>
      <Image source={logoSrc} style={styles.image} />
    </Box>
  )
}

const useStyles = mkUseStyles(() => ({
  image: {
    flex: 0.8,
    aspectRatio: 1,
    borderRadius: 9999,
  },
}))
