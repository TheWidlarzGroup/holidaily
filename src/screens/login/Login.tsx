import React, { FC, useCallback, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity, TextInput } from 'react-native'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { AuthNavigationType } from 'navigation/types'
import { Box, Text } from 'utils/theme/index'
import { FormInput } from 'components/FormInput'
import { useLogin } from 'hooks/useLogin'
import { emailRegex } from 'utils/regexes/emailRegex'
import { passwordRegex } from 'utils/regexes/passwordRegex'
import { CustomButton } from 'components/CustomButton'
import { createAlert } from 'utils/createAlert'
import { Container } from 'components/Container'

export const Login: FC = () => {
  const navigation = useNavigation<AuthNavigationType<'Login'>>()
  const { control, handleSubmit, errors } = useForm()
  const { handleLoginUser, isLoading, loginErrorMessage } = useLogin()
  const passwordRef = useRef<TextInput>(null)
  const { t } = useTranslation('login')

  const navigateToRemindPassword = useCallback(() => {
    navigation.navigate('ForgotPassword')
  }, [navigation])

  useEffect(() => {
    if (loginErrorMessage) createAlert('Login Error', loginErrorMessage)
  }, [loginErrorMessage])

  const onSubmitEditing = () => {
    passwordRef?.current?.focus()
  }

  const onLoginSubmit = handleSubmit((data) => handleLoginUser(data))

  return (
    <Container>
      <Box flex={0.4} justifyContent="center">
        <Text variant="title1">{t('loginTitle')}</Text>
        <Text variant="body1" marginTop="s">
          {t('loginSubTitle')}
        </Text>
      </Box>
      <Box marginHorizontal="l">
        <Box marginBottom="m">
          <FormInput
            control={control}
            isError={!!errors.email}
            errors={errors}
            name="email"
            inputLabel="E-mail Address"
            validationPattern={emailRegex}
            errorMessage="Incorrect email, please try again"
            keyboardType="email-address"
            autoCompleteType="email"
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={false}
            required
          />
        </Box>
        <Box>
          <FormInput
            control={control}
            isError={!!errors.password}
            errors={errors}
            name="password"
            inputLabel="Password"
            validationPattern={passwordRegex}
            errorMessage="Incorrect Password, please try again"
            ref={passwordRef}
            required
            isPasswordIconVisible
          />
        </Box>

        <Box alignSelf="flex-end">
          <TouchableOpacity onPress={navigateToRemindPassword}>
            <Text variant="remind1" marginRight="m">
              {t('loginForgotPassword')}
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
      <Box flex={0.4} justifyContent="center" marginHorizontal="xxl">
        <CustomButton
          label={t('loginButton')}
          variant="primary"
          onPress={onLoginSubmit}
          loading={isLoading}
        />
      </Box>
    </Container>
  )
}
