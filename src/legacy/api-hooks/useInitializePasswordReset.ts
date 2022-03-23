import { useMutation } from 'react-query'
import { useState } from 'react'
import { useTranslation, TFunction } from 'react-i18next'

import { ErrorTypes } from 'types/useLoginTypes'
import {
  InitializePasswordResetArgumentsTypes,
  InitializePasswordResetTypes,
} from 'types/useInitializePasswordResetTypes'
import { initializePasswordResetMutation } from 'legacy/graphql/mutations/initializePasswordResetMutation'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigationType } from 'navigation/types'

const customErrorMessage = (translate: TFunction<'mutationsErrors'>, errorMessage: string) => {
  if (errorMessage?.startsWith('invalid_credentials')) {
    return translate('invalidCredentials')
  }
  return translate('default')
}

export const useInitializePasswordReset = () => {
  const { t } = useTranslation('mutationsErrors')
  const navigation = useNavigation<AuthNavigationType<'ForgotPassword'>>()
  const [initializePasswordResetErrorMessage, setInitializePasswordResetErrorMessage] = useState('')
  const { mutate: handleInitializePasswordReset, isLoading } = useMutation<
    InitializePasswordResetTypes,
    ErrorTypes,
    InitializePasswordResetArgumentsTypes
  >(initializePasswordResetMutation, {
    onSuccess: () => {
      navigation.navigate('RecoveryCode')
    },

    onError: (error) => {
      setInitializePasswordResetErrorMessage(customErrorMessage(t, error.message))
    },
  })

  return { handleInitializePasswordReset, isLoading, initializePasswordResetErrorMessage }
}
