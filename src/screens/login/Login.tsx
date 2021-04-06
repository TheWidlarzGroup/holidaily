import React, { FC, useCallback, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, Pressable, ActivityIndicator, Alert } from 'react-native'
import { useForm, Controller } from 'react-hook-form'

import { AppNavigationType } from '../../navigation/types'
import { Box, Text, theme } from '../../utils/theme/index'
import { colors } from '../../utils/theme/colors'
import { CustomInput } from '../../components/CustomInput'
import { emailRegex } from '../../utils/regexes/emailRegex'
import { useLogin } from '../../hooks/useLogin'

const createAlert = (errorMessage: string) =>
  Alert.alert('Login Error', errorMessage, [
    {
      text: 'Ok',
      onPress: () => console.log('Ok Pressed'),
    },
  ])

export const Login: FC = () => {
  const navigation = useNavigation<AppNavigationType<'Login'>>()
  const { control, handleSubmit, errors } = useForm()
  const { handleLogin, isLoading, isLoginError } = useLogin()
  const navigateToRemindPassword = useCallback(() => {
    // TODO matthew:
    // Uncomment when this screen will be ready
    // navigation.navigate('RemindPassword')
  }, [navigation])

  useEffect(() => {
    if (isLoginError) {
      if (isLoginError?.isError && isLoginError.message) createAlert(isLoginError.message)
    }
  }, [isLoginError])

  // TODO matthew:
  // indicator will be moved to CustomButton after merge
  if (isLoading) {
    return (
      <Box flex={0.4} justifyContent="center">
        <ActivityIndicator size="large" color={colors.mainBackground} />
      </Box>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Box flex={0.4} justifyContent="center">
        <Text variant="title1">Nice to see you Again!</Text>
        <Text variant="body1" marginTop="s">
          Log in to your account
        </Text>
      </Box>
      <Box marginHorizontal="l">
        <Box marginBottom="m">
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <CustomInput
                inputText="E-mail Address"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                isWrong={errors.email !== undefined}
              />
            )}
            name="email"
            rules={{
              pattern: {
                value: emailRegex,
                message: 'Incorrect email, please try again',
              },
            }}
            defaultValue=""
          />
          {errors.email && (
            <Text variant="error1" marginTop="s" marginLeft="m">
              {errors.email.message}
            </Text>
          )}
        </Box>
        <Box>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <CustomInput
                inputText="Password"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                isWrong={errors.password !== undefined}
              />
            )}
            name="password"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.password && (
            <Text variant="error1" marginTop="s" marginLeft="m">
              Incorrect password, please try again
            </Text>
          )}
        </Box>
        <Box alignSelf="flex-end">
          <Pressable onPress={navigateToRemindPassword}>
            <Text variant="remind1" marginRight="m" marginTop="xm">
              Forgot your password?
            </Text>
          </Pressable>
        </Box>
      </Box>
      <Box flex={0.4} justifyContent="center">
        {/* TODO matthew: Will be changed to reusable button made by Bartek */}
        <Box
          marginHorizontal="xxl"
          height={53}
          justifyContent="center"
          backgroundColor="mainBackground"
          borderRadius="xxl">
          <Pressable onPress={handleSubmit(handleLogin)}>
            <Text variant="body1">Log in</Text>
          </Pressable>
        </Box>
      </Box>
    </SafeAreaView>
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
})
