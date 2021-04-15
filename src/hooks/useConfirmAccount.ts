import { useMutation } from 'react-query'

import { confirmAccount } from 'graphqlActions/mutations/confirmAccount'
import { ConfirmTypes, ConfirmMutationTypes } from 'types/useConfirmAccountTypes'
import { ErrorTypes } from 'types/useLoginTypes'

export const useConfirmAccount = () => {
  const { mutateAsync: handleConfirmAccount, isLoading, isSuccess } = useMutation<
    ConfirmMutationTypes,
    ErrorTypes,
    ConfirmTypes
  >(confirmAccount)

  return { handleConfirmAccount, isLoading, isSuccess }
}
