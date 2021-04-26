import { useState } from 'react'
import { useMutation } from 'react-query'

import { ErrorTypes } from 'types/useLoginTypes'
import { SignupTypes, HandleSignupTypes, CreateUserTypes } from 'types/useSignupTypes'
import { signupMutation } from 'graphqlActions/mutations/signupMutation'
import { useTranslation, TFunction } from 'react-i18next'
import { useLogin } from './useLogin'

const customErrorMessage = (translate: TFunction<'mutationsErrors'>, errorMessage: string) => {
  if (errorMessage?.startsWith('invalid_credentials')) {
    return translate('invalidCredentials')
  }
  if (errorMessage?.startsWith('email: has already been taken')) {
    return translate('emailAlreadyTaken')
  }
  return translate('default')
}
// emailAlreadyTaken

export const useSignup = () => {
  const [userPassword, setUserPassword] = useState('')
  const { t } = useTranslation('mutationsErrors')
  const { handleLoginUser } = useLogin()
  const [signupErrorMessage, setSignupErrorMessage] = useState('')
  const { mutate: handleSignupUser, isLoading, isSuccess } = useMutation<
    CreateUserTypes,
    ErrorTypes,
    SignupTypes
  >(signupMutation, {
    onSuccess: (data: CreateUserTypes) => {
      const { email } = data.createUser
      console.log(userPassword)
      handleLoginUser({ email, password: userPassword })
    },
    onError: (error: ErrorTypes, data: any) => {
      const errorMessage = customErrorMessage(t, error.message)
      console.log('here', data)
      setSignupErrorMessage(errorMessage)
    },
  })

  const handleSignup = ({ email, nameSurname, password }: HandleSignupTypes) => {
    const [firstName, lastName] = nameSurname.split(' ')
    setUserPassword(password)
    handleSignupUser({ email, firstName, lastName, password })
  }

  return { handleSignup, isLoading, signupErrorMessage, isSuccess }
}
