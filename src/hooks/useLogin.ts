import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import SecureStorage from 'react-native-secure-storage'
import { useMutation } from 'react-query'

import { loginMutation } from 'graphqlActions/mutations/loginMutation'
import { UserTypes, ErrorTypes } from 'types/useLoginTypes'
import { AppNavigationType } from 'navigation/types'
import { useUserContext } from './useUserContext'

const customErrorMessage = (errorMessage: string) => {
  if (errorMessage?.startsWith('invalid_credentials')) {
    return 'Incorrect email or password, please try again'
  }
  return 'Something went wrong, please try again later'
}

export const useLogin = () => {
  const [loginErrorMessage, setLoginErrorMessage] = useState('')
  const navigation = useNavigation<AppNavigationType<'Login'>>()
  const { handleUserDataChange, user } = useUserContext()
  const { mutate: handleLoginUser, isLoading } = useMutation<UserTypes, ErrorTypes, any>(
    loginMutation,
    {
      onSuccess: async (data: UserTypes) => {
        const {
          token,
          user: { confirmed, firstName, lastName, email },
        } = data.loginUser

        if (confirmed) {
          handleUserDataChange({ ...user, firstName: firstName, lastName: lastName, email: email })

          await SecureStorage.setItem('token', token)

          navigation.navigate('Home')
        } else {
          const errorMessage = 'Please confirm your account'

          setLoginErrorMessage(errorMessage)
        }
      },
      onError: (error: ErrorTypes) => {
        const errorMessage = customErrorMessage(error.message)

        setLoginErrorMessage(errorMessage)
      },
    }
  )

  return { handleLoginUser, isLoading, loginErrorMessage }
}
