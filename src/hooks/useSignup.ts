import { useState } from 'react'
import { useMutation } from 'react-query'

import { ErrorTypes } from 'types/useLoginTypes'
import { SignupTypes, HandleSignupTypes, CreateUserTypes } from 'types/useSignupTypes'
import { signupMutation } from 'graphqlActions/mutations/signupMutation'
import { useUserContext } from './useUserContext'

const customErrorMessage = (errorMessage: string) => {
  if (errorMessage?.startsWith('invalid_credentials')) {
    return 'Incorrect email, please try again'
  }

  // TODO:
  // Change errors messages from strins to i18n keys,
  // Add email taken handling (errorMessage?.startswith('email: has already been taken'))
}

export const useSignup = () => {
  const { updateUser } = useUserContext()
  const [signupErrorMessage, setSignupErrorMessage] = useState<string | undefined>('')
  const { mutate: handleSignupUser, isLoading, isSuccess } = useMutation<
    CreateUserTypes,
    ErrorTypes,
    SignupTypes
  >(signupMutation, {
    onSuccess: (data: CreateUserTypes) => {
      const { email } = data.createUser
      updateUser({ email })
    },
    onError: (error: ErrorTypes) => {
      const errorMessage = customErrorMessage(error.message)

      setSignupErrorMessage(errorMessage)
    },
  })

  const handleSignup = ({ email, nameSurname, password }: HandleSignupTypes) => {
    const [firstName, lastName] = nameSurname.split(' ')

    handleSignupUser({ email, firstName, lastName, password })
  }

  return { handleSignup, isLoading, signupErrorMessage, isSuccess }
}
