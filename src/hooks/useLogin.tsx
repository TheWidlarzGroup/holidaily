import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import SecureStorage from 'react-native-secure-storage'
import { useMutation } from 'react-query'
import request, { gql } from 'graphql-request'
import { AppNavigationType } from '../navigation/types'

type LoginTypes = {
  email: string
  password: string
}

type UserTypes = {
  loginUser: {
    token: string
    user: {
      confirmed: boolean | null
    }
  }
}

type ErrorTypes = {
  isError: boolean
  message: string | undefined
}

const customErrorMessage = (errorMessage: string | undefined) => {
  if (errorMessage && errorMessage.startsWith('invalid_credentials')) {
    return 'Incorrect email or password, please try again'
  }
}
const endpoint = 'https://holidaily.danielgrychtol.com/api/graphiql'

export const useLogin = () => {
  const [isLoginError, setIsLoginError] = useState<ErrorTypes>()
  const navigation = useNavigation<AppNavigationType<'Login'>>()
  const { mutateAsync: handleLoginUser, isLoading } = useMutation<
    UserTypes,
    ErrorTypes,
    LoginTypes
  >(
    async ({ email, password }: LoginTypes) =>
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
      ),

    {
      onSuccess: async (data: UserTypes) => {
        const { confirmed } = data.loginUser.user
        const { token } = data.loginUser
        if (confirmed) {
          await SecureStorage.setItem('token', token)
          navigation.navigate('Home')
        }
      },
      onError: (error: ErrorTypes) => {
        const errorObject = {
          isError: error !== null,
          message: customErrorMessage(error.message),
        }
        setIsLoginError(errorObject)
      },
    }
  )

  const handleLogin = async ({ email, password }: LoginTypes) => {
    await handleLoginUser({ email, password })
  }

  return { handleLogin, isLoading, isLoginError }
}
