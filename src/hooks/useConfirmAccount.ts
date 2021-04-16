import { useMutation } from 'react-query'

import { confirmAccount } from 'graphqlActions/mutations/confirmAccount'
import { ConfirmTypes } from 'types/useConfirmAccountTypes'
import { ErrorTypes } from 'types/useLoginTypes'
import { useState } from 'react'
import { useTranslation, TFunction } from 'react-i18next'

const customErrorMessage = (translate: TFunction<'mutationsErrors'>, errorMessage: string) => {
  if (errorMessage?.startsWith('already_confirmed')) {
    return translate('alreadyConfirmed')
  }
  if (errorMessage?.startsWith('invalid_token')) {
    return translate('invalidToken')
  }
  return translate('default')
}

export const useConfirmAccount = () => {
  const { t } = useTranslation('mutationsErrors')
  const [confirmErrorMessage, setConfirmErrorMessage] = useState('')
  const { mutateAsync: handleConfirmAccount, isLoading, isSuccess } = useMutation<
    Promise<void>,
    ErrorTypes,
    ConfirmTypes
  >(confirmAccount, {
    onError: (error) => {
      setConfirmErrorMessage(customErrorMessage(t, error.message))
    },
  })

  const asyncConfirmAccount = async (token: string) => {
    try {
      await handleConfirmAccount({ email: 'mateki0@interia.pl', token })
    } catch (err) {
      console.log(err)
    }
  }
  return { asyncConfirmAccount, isLoading, isSuccess, confirmErrorMessage }
}
