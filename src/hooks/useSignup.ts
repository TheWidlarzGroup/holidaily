import { useState } from 'react'
import { useMutation } from 'react-query'

import { ErrorTypes } from 'types/useLoginTypes'
import { SignupTypes, CreateUserTypes, HandleSignupTypes } from 'types/useSignupTypes'
import { signupMutation } from 'graphqlActions/mutations/signupMutation'

const customErrorMessage = (errorMessage: string) => {
  if (errorMessage?.startsWith('invalid_credentials')) {
    return 'Incorrect email, please try again'
  }
  return 'Something went wrong, please try again later'
}

export const useSignup = () => {
  const [isSignupError, setIsSignupError] = useState<ErrorTypes>()
  const { mutateAsync: handleSignupUser, isLoading, isSuccess } = useMutation<
    CreateUserTypes,
    ErrorTypes,
    SignupTypes
  >(signupMutation, {
    onError: (error: ErrorTypes) => {
      const errorObject = {
        isError: true,
        message: customErrorMessage(error.message),
      }
      setIsSignupError(errorObject)
    },
  })

  const handleSignup = async ({ email, nameSurname, password }: HandleSignupTypes) => {
    const [firstName, lastName] = nameSurname.split(' ')
    await handleSignupUser({ email, firstName, lastName, password })
  }

  return { handleSignup, isLoading, isSignupError, isSuccess }
}
