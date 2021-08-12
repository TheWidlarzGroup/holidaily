import { useState } from 'react'
import { useMutation } from 'react-query'

import { useTranslation, TFunction } from 'react-i18next'
import { ErrorTypes, ResetPasswordDataTypes, ResetPasswordTypes } from 'types/useResetPasswordTypes'
import { resetPasswordMutation } from 'graphqlActions/mutations/resetPasswordMutation'

const customErrorMessage = (translate: TFunction<'mutationsErrors'>, errorMessage: string) => {
  if (errorMessage?.startsWith('invalid_code')) {
    return translate('invalidCredentials')
  }
  return translate('default')
}

export const useResetPassword = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const { t } = useTranslation('mutationsErrors')
  const {
    mutate: handleResetPassword,
    isLoading,
    isSuccess,
  } = useMutation<ResetPasswordDataTypes, ErrorTypes, ResetPasswordTypes>(resetPasswordMutation, {
    onError: (error: ErrorTypes) => {
      setErrorMessage(customErrorMessage(t, error.message))
    },
  })

  return { handleResetPassword, isLoading, errorMessage, isSuccess }
}
