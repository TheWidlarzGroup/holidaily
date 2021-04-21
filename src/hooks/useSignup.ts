import { useState } from 'react'
import { useMutation } from 'react-query'

import { ErrorTypes } from 'types/useLoginTypes'
import { SignupTypes, HandleSignupTypes } from 'types/useSignupTypes'
import { signupMutation } from 'graphqlActions/mutations/signupMutation'
import { useUserContext } from './useUserContext'

const customErrorMessage = (errorMessage: string) => {
  if (errorMessage?.startsWith('invalid_credentials')) {
    return 'Incorrect email, please try again'
  }
  return 'Something went wrong, please try again later'
}

export const useSignup = () => {
  const { handleUserDataChange, user } = useUserContext()
  const [signupErrorMessage, setSignupErrorMessage] = useState('')
  const { mutate: handleSignupUser, isLoading, isSuccess } = useMutation<
    SignupTypes,
    ErrorTypes,
    SignupTypes
  >(signupMutation, {
    onSuccess: (data: SignupTypes) => {
      const { email } = data
      handleUserDataChange({ ...user, email })
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
