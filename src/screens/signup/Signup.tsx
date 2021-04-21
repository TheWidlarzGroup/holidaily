import React, { FC, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

import { Box, Text, theme } from 'utils/theme/index'
import { CustomButton } from 'components/CustomButton'
import { getHalfOfTheWindowWidth } from 'utils/getHalfOfTheWindowWidth'
import { AuthNavigationType } from 'navigation/types'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'

export const Signup: FC = () => {
  const navigation = useNavigation<AuthNavigationType<'Signup'>>()

  const { t } = useTranslation('signup')

  const navigateToTestScreen = useCallback(() => {
    navigation.navigate('SignupEmail')
  }, [navigation])

  return (
    <SafeAreaWrapper>
      <Box flex={0.4} justifyContent="center" maxWidth={300}>
        <Text variant="title1">{t('signupTitle')}</Text>
      </Box>
      <Box
        width={getHalfOfTheWindowWidth()}
        height={getHalfOfTheWindowWidth()}
        backgroundColor="secondary"
        borderRadius="m"
        alignSelf="center"
      />
      <Box flex={0.6} justifyContent="center" marginHorizontal="xl">
        <CustomButton label={t('continueWGmail')} variant="secondary" icon="google" />
        <CustomButton
          label={t('continueWSlack')}
          variant="secondary"
          icon="slack"
          marginTop={theme.spacing.m}
        />
        <CustomButton
          label={t('signupWEmail')}
          variant="primary"
          marginTop={theme.spacing.xl}
          onPress={navigateToTestScreen}
        />
      </Box>
    </SafeAreaWrapper>
  )
}
