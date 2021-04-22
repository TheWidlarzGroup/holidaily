import React, { FC, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

import { Box, Text, theme } from 'utils/theme/index'
import { CustomButton } from 'components/CustomButton'
import { getHalfOfTheWindowWidth } from 'utils/getHalfOfTheWindowWidth'
import { AuthNavigationType } from 'navigation/types'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { TextLink } from 'components/TextLink'

export const Signup: FC = () => {
  const navigation = useNavigation<AuthNavigationType<'Signup'>>()

  const { t } = useTranslation(['signup', 'login'])

  const navigateToSignupEmail = useCallback(() => {
    navigation.navigate('SignupEmail')
  }, [navigation])

  const navigateToLogin = useCallback(() => {
    navigation.navigate('Login')
  }, [navigation])

  return (
    <SafeAreaWrapper>
      <Box flex={0.4} justifyContent="center" marginHorizontal="xl">
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
          marginTop={theme.spacing.l}
          onPress={navigateToSignupEmail}
        />
        <Box flexDirection="row" padding="m" justifyContent="center" alignItems="center">
          <Text variant="body1" paddingRight="xm">
            {t('alreadyHaveAccount')}
          </Text>
          <TextLink
            text={t('login:loginButton')}
            action={navigateToLogin}
            variant="alreadyRegistered"
          />
        </Box>
      </Box>
    </SafeAreaWrapper>
  )
}
