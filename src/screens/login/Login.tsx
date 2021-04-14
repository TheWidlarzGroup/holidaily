import React, { FC, useCallback, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, Pressable, TextInput, KeyboardAvoidingView } from 'react-native'

import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { AppNavigationType } from '../../navigation/types'
import { Box, Text, theme } from '../../utils/theme/index'
import { colors } from '../../utils/theme/colors'
import { FormInput } from '../../components/FormInput'
import { useLogin } from '../../hooks/useLogin'
import { emailRegex } from '../../utils/regexes/emailRegex'
import { passwordRegex } from '../../utils/regexes/passwordRegex'
import { CustomButton } from '../../components/CustomButton'
import { isIos } from '../../utils/isIos'
import { createAlert } from '../../utils/createAlert'

export const Login: FC = () => {
  const navigation = useNavigation<AppNavigationType<'Login'>>()
  const { control, handleSubmit, errors } = useForm()
  const { handleLogin, isLoading, isLoginError } = useLogin()
  const passwordRef = useRef<TextInput>(null)
  const { t } = useTranslation('login')

  const navigateToRemindPassword = useCallback(() => {
    navigation.navigate('ForgotPassword')
  }, [navigation])

  useEffect(() => {
    if (isLoginError?.isError) createAlert('Login Error', isLoginError.message)
  }, [isLoginError])

  const onSubmitEditing = () => {
    passwordRef?.current?.focus()
  }

  return (
    <KeyboardAvoidingView behavior={isIos() ? 'padding' : 'height'} style={styles.keyboardAvoiding}>
      <SafeAreaView style={styles.container}>
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
              errors={errors}
              name="password"
              inputLabel="Password"
              validationPattern={passwordRegex}
              errorMessage="Incorrect Password, please try again"
              ref={passwordRef}
              required
            />
          </Box>

          <Box alignSelf="flex-end">
            <Pressable onPress={navigateToRemindPassword}>
              <Text variant="remind1" marginRight="m" marginTop="xm">
                {t('loginForgotPassword')}
              </Text>
            </Pressable>
          </Box>
        </Box>
        <Box flex={0.4} justifyContent="center" marginHorizontal="xxl">
          <CustomButton
            label={t('loginButton')}
            variant="primary"
            onPress={handleSubmit(handleLogin)}
            loading={isLoading}
          />
        </Box>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  input: {
    height: 50,
    backgroundColor: colors.lightGrey,
    borderRadius: theme.borderRadii.xxl,
    paddingHorizontal: theme.spacing.m,
  },

  keyboardAvoiding: {
    flex: 1,
  },
})
