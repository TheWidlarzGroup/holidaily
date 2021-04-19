import { useMutation } from 'react-query'
import { recoveryMutation } from 'graphqlActions/mutations/recoveryMutation'
import { ErrorTypes } from 'types/useLoginTypes'
import { RecoveryArgumentsTypes, RecoveryMutationTypes } from 'types/useRecoveryTypes'
import { useState } from 'react'

export const useRecoveryPassword = () => {
  const [recoveryErrorMessage, setRecoveryErrorMessage] = useState('')
  const { mutateAsync: handleRecoveryPassword, isLoading } = useMutation<
    RecoveryMutationTypes,
    ErrorTypes,
    RecoveryArgumentsTypes
  >(recoveryMutation, {
    onError: (error: ErrorTypes) => {
      setRecoveryErrorMessage(error.message)
    },
  })

  const handleRecovery = async ({ email }: RecoveryArgumentsTypes) => {
    await handleRecoveryPassword({ email })
  }

  return { handleRecovery, isLoading, recoveryErrorMessage }
}
