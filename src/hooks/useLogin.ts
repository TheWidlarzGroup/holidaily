import { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import SecureStorage from 'react-native-secure-storage'
import { useMutation } from 'react-query'

import { loginMutation } from 'graphqlActions/mutations/loginMutation'
import { UserTypes, ErrorTypes, LoginTypes } from 'types/useLoginTypes'
import { AppNavigationType } from 'navigation/types'
import { UserContext } from 'contexts/UserContext'

const customErrorMessage = (errorMessage: string) => {
  if (errorMessage?.startsWith('invalid_credentials')) {
    return 'Incorrect email or password, please try again'
  }
  return 'Something went wrong, please try again later'
}

export const useLogin = () => {
  const [isLoginError, setIsLoginError] = useState<ErrorTypes>()
  const navigation = useNavigation<AppNavigationType<'Login'>>()
  const { handleUserDataChange } = useContext(UserContext)
  const { mutateAsync: handleLoginUser, isLoading } = useMutation<
    UserTypes,
    ErrorTypes,
    LoginTypes
  >(loginMutation, {
    onSuccess: async (data: UserTypes) => {
      const {
        token,
        user: { confirmed, firstName, lastName, email },
      } = data.loginUser

      if (confirmed) {
        handleUserDataChange({
          firstName: firstName,
          lastName: lastName,
          email: email,
        })

        await SecureStorage.setItem('token', token)

        navigation.navigate('Home')
      } else {
        const errorObject = {
          isError: true,
          message: 'Please confirm your account',
        }

        setIsLoginError(errorObject)
      }
    },
    onError: (error: ErrorTypes) => {
      const errorObject = {
        isError: true,
        message: customErrorMessage(error.message),
      }

      setIsLoginError(errorObject)
    },
  })

  const handleLogin = async ({ email, password }: LoginTypes) => {
    await handleLoginUser({ email, password })
  }

  return { handleLogin, isLoading, isLoginError }
}
