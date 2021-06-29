import React, { FC, useCallback, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { AuthNavigationType } from 'navigation/types'
import { Box, Text, mkUseStyles, Theme } from 'utils/theme/index'
import { FormInput } from 'components/FormInput'
import { useLogin } from 'hooks/useLogin'
import { CustomButton } from 'components/CustomButton'
import { createAlert } from 'utils/createAlert'
import { Container } from 'components/Container'
import { TextLink } from 'components/TextLink'
import { emailRegex, passwordRegex } from 'utils/regex'
import { LoginTypes } from 'types/useLoginTypes'

export const Login: FC = () => {
  const styles = useStyles()
  const navigation = useNavigation<AuthNavigationType<'Login'>>()
  const { control, handleSubmit, errors } = useForm()
  const { handleLoginUser, isLoading, loginErrorMessage } = useLogin()
  const passwordRef = useRef<TextInput>(null)
  const { t } = useTranslation('login')

  const navigateToRemindPassword = useCallback(() => {
    navigation.navigate('Recovery')
  }, [navigation])

  useEffect(() => {
    if (loginErrorMessage) createAlert('Login Error', loginErrorMessage)
  }, [loginErrorMessage])

  const onSubmitEditing = () => {
    passwordRef?.current?.focus()
  }

  const onLoginSubmit = handleSubmit((data: LoginTypes) => handleLoginUser(data))

  return (
    <>
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
              isPasswordIconVisible
            />
          </Box>

          <Box alignSelf="flex-end">
            <Box marginRight="m">
              <TextLink
                text={t('loginForgotPassword')}
                action={navigateToRemindPassword}
                variant="remind1"
              />
            </Box>
          </Box>
        </Box>
      </Container>
      <Box
        position="absolute"
        right={0}
        left={0}
        bottom={0}
        paddingHorizontal="xxl"
        paddingTop="m"
        backgroundColor="white"
        height={105}
        alignItems="center"
        style={styles.shadow}>
        <CustomButton
          label={t('loginButton')}
          variant="primary"
          onPress={onLoginSubmit}
          loading={isLoading}
        />
      </Box>
    </>
  )
}
const useStyles = mkUseStyles((theme: Theme) => ({
  shadow: {
    shadowOffset: { width: -2, height: 0 },
    shadowColor: theme.colors.black,
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 20,
  },
}))
