import { useState } from 'react'
import { useMutation } from 'react-query'

import { ErrorTypes } from 'types/useLoginTypes'
import { CreateOrganizationTypes, CreateOrganizationDataTypes } from 'types/useSignupTypes'
import { createOrganizationMutation } from 'graphqlActions/mutations/createOrganizationMutation'
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

export const useCreateOrganization = () => {
  const [userPassword, setUserPassword] = useState('')
  const { t } = useTranslation('mutationsErrors')
  const { handleLoginUser } = useLogin()
  const [signupErrorMessage, setSignupErrorMessage] = useState('')

  const {
    mutate: handleSignupUser,
    isLoading,
    isSuccess,
  } = useMutation<CreateOrganizationDataTypes, ErrorTypes, CreateOrganizationTypes>(
    createOrganizationMutation,
    {
      onSuccess: (data: CreateOrganizationDataTypes) => {
        const { email } = data.createOrganization

        handleLoginUser({ email, password: userPassword })
      },

      onError: (error: ErrorTypes) => {
        const errorMessage = customErrorMessage(t, error.message)

        setSignupErrorMessage(errorMessage)
      },
    }
  )

  const handleSignup = (data: CreateOrganizationTypes) => {
    setUserPassword(data.password)
    handleSignupUser(data)
  }

  return { handleSignup, isLoading, signupErrorMessage, isSuccess }
}
