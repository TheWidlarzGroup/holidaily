import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Box } from 'utils/theme/index'
import { AuthNavigationType } from 'navigation/types'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { SignupButtons } from './components/SignupButtons'
import { SignupLoginBox } from './components/SingupLoginBox'
import { SignupTitleAndLogo } from './components/SignupTitleAndLogo'

export const Signup = () => {
  const { navigate } = useNavigation<AuthNavigationType<'Signup'>>()

  const navigateToSignupEmail = useCallback(() => {
    navigate('SignupEmail')
  }, [navigate])

  const navigateToLogin = useCallback(() => {
    navigate('Login')
  }, [navigate])

  return (
    <SafeAreaWrapper>
      <Box flex={1} justifyContent="space-between" marginHorizontal="xl">
        <SignupTitleAndLogo />
        <Box flex={1} justifyContent="space-between">
          <SignupButtons onPress={navigateToSignupEmail} />
          <SignupLoginBox onPress={navigateToLogin} />
        </Box>
      </Box>
    </SafeAreaWrapper>
  )
}
