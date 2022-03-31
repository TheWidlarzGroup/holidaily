import { useMutation } from 'react-query'

import { useState } from 'react'
import { useTranslation, TFunction } from 'react-i18next'
import { retriggerAccountConfirmationEmail } from 'graphqlActions/mutations/retriggerAccountConfirmationEmail'
import { RetriggerAccountConfirmationEmailMutationTypes } from 'types/useRetriggerAccountConfirmationEmailTypes'
import { ErrorTypes } from 'types/useLoginTypes'

const customErrorMessage = (translate: TFunction<'mutationsErrors'>, errorMessage: string) => {
  if (errorMessage?.startsWith('invalid_token')) {
    return translate('invalidToken')
  }
  return translate('default')
}

export const useRetriggerAccountConfirmationEmail = () => {
  const { t } = useTranslation('mutationsErrors')
  const [confirmErrorMessage, setConfirmErrorMessage] = useState('')
  const {
    mutate: handleRetriggerAccountConfirmationEmail,
    isLoading,
    isSuccess,
  } = useMutation<RetriggerAccountConfirmationEmailMutationTypes, ErrorTypes>(
    retriggerAccountConfirmationEmail,
    {
      onError: (error) => {
        setConfirmErrorMessage(customErrorMessage(t, error.message))
      },
    }
  )

  return { handleRetriggerAccountConfirmationEmail, isLoading, isSuccess, confirmErrorMessage }
}
