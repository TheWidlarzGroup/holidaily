import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { createAlert } from 'utils/createAlert'
import { UpdateUserTypes, UpdateUserDataTypes, ErrorTypes } from 'types/useUpdateUserTypes'
import { updateUserMutation } from 'graphqlActions/mutations/updateUserMutation'

export const useUpdateUser = () => {
  const { t } = useTranslation('mutationsErrors')
  const {
    mutate: handleUpdateUser,
    isLoading,
    isSuccess,
  } = useMutation<UpdateUserDataTypes, ErrorTypes, UpdateUserTypes>(updateUserMutation, {
    onError: () => {
      createAlert(t('default'), '')
    },
  })

  return { handleUpdateUser, isLoading, isSuccess }
}
