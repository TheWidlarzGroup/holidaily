import { useState } from 'react'
import SecureStorage from 'react-native-secure-storage'
import { useMutation } from 'react-query'

import { loginMutation } from 'graphqlActions/mutations/loginMutation'
import { UserTypes, ErrorTypes } from 'types/useLoginTypes'
import { useUserContext } from './useUserContext'

const customErrorMessage = (errorMessage: string) => {
  if (errorMessage?.startsWith('invalid_credentials')) {
    return 'Incorrect email or password, please try again'
  }
  return 'Something went wrong, please try again later'
}

export const useLogin = () => {
  const [loginErrorMessage, setLoginErrorMessage] = useState('')

  const { updateUser } = useUserContext()
  const { mutate: handleLoginUser, isLoading } = useMutation<UserTypes, ErrorTypes, any>(
    loginMutation,
    {
      onSuccess: async (data: UserTypes) => {
        const { token, user } = data.loginUser

        if (user.confirmed) {
          updateUser(user)

          await SecureStorage.setItem('token', token)
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
