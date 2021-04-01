import React, { FC, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, Pressable } from 'react-native'
import { useForm, Controller } from 'react-hook-form'

import { AppNavigationType } from '../../navigation/types'
import { Box, Text } from '../../utils/theme/index'
import { CustomInput } from '../../components/CustomInput'

type LoginTypes = {
  email: string
  password: string
}

export const Login: FC = () => {
  const navigation = useNavigation<AppNavigationType<'Login'>>()
  const { control, handleSubmit, errors } = useForm()

  const handleLogin = ({ email, password }: LoginTypes) => {
    // To Do
    console.log('email ', email)
    console.log('password ', password)
  }

  const navigateToRemindPassword = useCallback(() => {
    // Uncomment when this screen will be ready
    // navigation.navigate('RemindPassword')
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <Box flex={0.4} justifyContent="center" alignSelf="center">
        <Text variant="title1">Nice to see you Again!</Text>
        <Text variant="body1" marginTop="s">
          Log in to your account
        </Text>
      </Box>
      <Box width={327} alignSelf="center">
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
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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
        {/* do zmiany na button, ktory jest w pull requescie Bartka */}
        <Box
          width={221}
          height={53}
          alignSelf="center"
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
    backgroundColor: '#fff',
  },

  input: {
    height: 50,
    backgroundColor: '#E1E1E1',
    borderRadius: 100,
    paddingHorizontal: 20,
  },
})
