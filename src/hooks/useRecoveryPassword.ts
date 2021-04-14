import { useMutation } from 'react-query'
import { recoveryMutation } from 'graphqlActions/mutations/recoveryMutation'
import { ErrorTypes } from 'types/useLoginTypes'
import { RecoveryArgumentsTypes, RecoveryMutationTypes } from 'types/useRecoveryTypes'

export const useRecoveryPassword = () => {
  const { mutateAsync: handleRecoveryPassword, isLoading } = useMutation<
    RecoveryMutationTypes,
    ErrorTypes,
    RecoveryArgumentsTypes
  >(recoveryMutation)

  const handleRecovery = async ({ email }: RecoveryArgumentsTypes) => {
    await handleRecoveryPassword({ email })
  }

  return { handleRecovery, isLoading }
}
