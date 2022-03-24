import { useState } from 'react'
import { useMutation } from 'react-query'

import { ErrorTypes } from 'types/useLoginTypes'
import { SignupWithCodeTypes, SignupWithCodeDataTypes } from 'types/useSignupTypes'
import { useTranslation, TFunction } from 'react-i18next'
import { signupWithCodeMutation } from 'graphqlActions/mutations/signupWithCodeMutation'
import { useLogin } from 'hooks/legacy-api-hooks/useLogin'

const customErrorMessage = (translate: TFunction<'mutationsErrors'>, errorMessage: string) => {
  if (errorMessage?.startsWith('invalid_credentials')) {
    return translate('invalidCredentials')
  }
  return translate('default')
}

export const useSignupWithCode = () => {
  const [userPassword, setUserPassword] = useState('')
  const { t } = useTranslation('mutationsErrors')
  const { handleLoginUser } = useLogin()
  const [signupErrorMessage, setSignupErrorMessage] = useState('')

  const {
    mutate: handleSignupUser,
    isLoading,
    isSuccess,
  } = useMutation<SignupWithCodeDataTypes, ErrorTypes, SignupWithCodeTypes>(
    signupWithCodeMutation,
    {
      onSuccess: (data: SignupWithCodeDataTypes) => {
        const { email } = data.createUser

        handleLoginUser({ email, password: userPassword })
      },

      onError: (error: ErrorTypes) => {
        const errorMessage = customErrorMessage(t, error.message)

        setSignupErrorMessage(errorMessage)
      },
    }
  )

  const handleSignup = (data: SignupWithCodeTypes) => {
    setUserPassword(data.password)
    handleSignupUser(data)
  }

  return { handleSignup, isLoading, signupErrorMessage, isSuccess }
}
