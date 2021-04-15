import { useMutation } from 'react-query'

import { confirmAccount } from 'graphqlActions/mutations/confirmAccount'
import { ConfirmTypes } from 'types/useConfirmAccountTypes'
import { ErrorTypes } from 'types/useLoginTypes'

export const useConfirmAccount = () => {
  const { mutateAsync: handleConfirmAccount, isLoading, isSuccess } = useMutation<
    Promise<void>,
    ErrorTypes,
    ConfirmTypes
  >(confirmAccount)

  return { handleConfirmAccount, isLoading, isSuccess }
}
