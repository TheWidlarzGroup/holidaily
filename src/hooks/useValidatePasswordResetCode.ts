import { useMutation } from 'react-query'
import { useState } from 'react'
import { useTranslation, TFunction } from 'react-i18next'

import { ErrorTypes } from 'types/useLoginTypes'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigationType } from 'navigation/types'
import {
  ValidatePasswordResetCodeArgumentsTypes,
  ValidatePasswordResetCodeTypes,
} from 'types/useValidatePasswordResetCodeTypes'
import { validatePasswordResetCodeMutation } from 'graphqlActions/mutations/validatePasswordResetCodeMutation'

const customErrorMessage = (translate: TFunction<'mutationsErrors'>, errorMessage: string) => {
  if (errorMessage?.startsWith('invalid_credentials')) {
    return translate('invalid_credentials')
  }
  return translate('default')
}

export const useValidatePasswordResetCode = () => {
  const { t } = useTranslation('mutationsErrors')
  const navigation = useNavigation<AuthNavigationType<'RecoveryCode'>>()
  const [
    validatePasswordResetCodeErrorMessage,
    setValidatePasswordResetCodeErrorMessage,
  ] = useState('')
  const { mutate: handleValidatePasswordResetCode, isLoading } = useMutation<
    ValidatePasswordResetCodeTypes,
    ErrorTypes,
    ValidatePasswordResetCodeArgumentsTypes
  >(validatePasswordResetCodeMutation, {
    onSuccess: () => {
      navigation.navigate('NewPassword')
    },

    onError: (error) => {
      setValidatePasswordResetCodeErrorMessage(customErrorMessage(t, error.message))
    },
  })

  return { handleValidatePasswordResetCode, isLoading, validatePasswordResetCodeErrorMessage }
}
