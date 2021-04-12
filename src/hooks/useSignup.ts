import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useMutation } from 'react-query'

import { AppNavigationType } from '../navigation/types'
import { ErrorTypes } from '../types/useLoginTypes'
import { SignupTypes, CreateUserTypes } from '../types/useSignupTypes'
import { loginMutation } from '../graphql/mutations/loginMutation'

const customErrorMessage = (errorMessage: string) => {
  if (errorMessage?.startsWith('invalid_credentials')) {
    return 'Incorrect email or password, please try again'
  }
  return 'Something went wrong, please try again later'
}

export const useSignup = () => {
  const [isError, setIsError] = useState<ErrorTypes>()
  const navigation = useNavigation<AppNavigationType<'Signup'>>()
  const { mutateAsync: handleLoginUser, isLoading } = useMutation<
    CreateUserTypes,
    ErrorTypes,
    SignupTypes
  >(loginMutation, {
    onSuccess: () => {
      navigation.navigate('Home')
    },
    onError: (error: ErrorTypes) => {
      const errorObject = {
        isError: true,
        message: customErrorMessage(error.message),
      }
      setIsError(errorObject)
    },
  })

  const handleLogin = async ({
    email,
    firstName,
    lastName,
    password,
    passwordConfirmation,
  }: SignupTypes) => {
    await handleLoginUser({ email, firstName, lastName, password, passwordConfirmation })
  }

  return { handleLogin, isLoading, isError }
}
