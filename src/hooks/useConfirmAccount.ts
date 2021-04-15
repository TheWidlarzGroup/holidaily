import { useMutation } from 'react-query'

import { confirmAccount } from 'graphqlActions/mutations/confirmAccount'
import { ConfirmTypes, ConfirmMutationTypes } from 'types/useConfirmAccountTypes'
import { ErrorTypes } from 'types/useLoginTypes'
import { useState } from 'react'

const customErrorMessage = (errorMessage: string) => {
  if (errorMessage?.startsWith('already_confirmed')) {
    return 'Account is already confirmed, you can now log in'
  }
  return 'Something went wrong, please try again later'
}

export const useConfirmAccount = () => {
  const [isConfirmError, setIsConfirmError] = useState<ErrorTypes>()

  const { mutateAsync: handleConfirmAccount, isLoading, isSuccess } = useMutation<
    ConfirmMutationTypes,
    ErrorTypes,
    ConfirmTypes
  >(confirmAccount, {
    onSuccess: (data) => {
      console.log('success data', data)
    },
    onError: (error) => {
      const errorObject = {
        isError: true,
        message: customErrorMessage(error.message),
      }
      setIsConfirmError(errorObject)
      console.log('error', error.message)
    },
  })

  return { handleConfirmAccount, isLoading, isSuccess, isConfirmError }
}
