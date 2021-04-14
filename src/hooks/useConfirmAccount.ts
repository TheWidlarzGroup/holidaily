import { useMutation } from 'react-query'
import { useNavigation } from '@react-navigation/native'

import { AppNavigationType } from 'navigation/types'
import { confirmAccount } from 'graphqlActions/mutations/confirmAccount'
import { ConfirmTypes, ConfirmMutationTypes } from 'types/useConfirmAccountTypes'
import { ErrorTypes } from 'types/useLoginTypes'

export const useConfirmAccount = () => {
  const navigation = useNavigation<AppNavigationType<'Login'>>()

  const { mutateAsync: handleConfirmAccount, isLoading, isSuccess } = useMutation<
    ConfirmMutationTypes,
    ErrorTypes,
    ConfirmTypes
  >(confirmAccount, {
    onSuccess: (data) => {
      console.log('success data', data)
    },
    onError: (error) => {
      console.log('error', error.message)
    },
  })

  const handleConfirm = async ({ email, token }: ConfirmTypes) => {
    await handleConfirmAccount({ email, token })
  }

  return { handleConfirm, isLoading, isSuccess }
}
