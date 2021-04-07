import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import SecureStorage from 'react-native-secure-storage'
import { useMutation } from 'react-query'
import request, { gql } from 'graphql-request'
import { AppNavigationType } from '../navigation/types'
import { UserTypes, ErrorTypes, LoginTypes } from '../types/useLoginTypes'
import { endpoint } from '../utils/config/endpoint'

const customErrorMessage = (errorMessage: string) => {
  if (errorMessage?.startsWith('invalid_credentials')) {
    return 'Incorrect email or password, please try again'
  }
  return 'Something went wrong, please try again later'
}

const loginRequest = ({ email, password }: LoginTypes) =>
  request(
    endpoint,
    gql`
    mutation{
      loginUser(email: "${email}", password: "${password}") {
        token
        user{
          confirmed
        }
      }
    }
  `
  )

export const useLogin = () => {
  const [isLoginError, setIsLoginError] = useState<ErrorTypes>()
  const navigation = useNavigation<AppNavigationType<'Login'>>()
  const { mutateAsync: handleLoginUser, isLoading } = useMutation<
    UserTypes,
    ErrorTypes,
    LoginTypes
  >(loginRequest, {
    onSuccess: async (data: UserTypes) => {
      const {
        token,
        user: { confirmed },
      } = data.loginUser

      if (confirmed) {
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
  })

  const handleLogin = async ({ email, password }: LoginTypes) => {
    try {
      await handleLoginUser({ email, password })
    } catch (error) {
      const errorObject = {
        isError: true,
        message: customErrorMessage(error.message),
      }
      setIsLoginError(errorObject)
    }
  }

  return { handleLogin, isLoading, isLoginError }
}
