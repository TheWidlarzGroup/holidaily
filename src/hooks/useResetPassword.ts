import { useState } from 'react'
import { useMutation } from 'react-query'

import { useTranslation } from 'react-i18next'
import { ErrorTypes, ResetPasswordDataTypes, ResetPasswordTypes } from 'types/useResetPasswordTypes'
import { resetPasswordMutation } from 'graphqlActions/mutations/resetPasswordMutation'

export const useResetPassword = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const { t } = useTranslation('mutationsErrors')
  const {
    mutate: handleResetPassword,
    isLoading,
    isSuccess,
  } = useMutation<ResetPasswordDataTypes, ErrorTypes, ResetPasswordTypes>(resetPasswordMutation, {
    onError: () => {
      setErrorMessage(t('default'))
    },
  })

  return { handleResetPassword, isLoading, errorMessage, isSuccess }
}
