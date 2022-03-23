import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { createAlert } from 'utils/createAlert'
import { UpdateUserTypes, UpdateUserDataTypes } from 'types/useUpdateUserTypes'
import { ErrorTypes } from 'types/useErrorTypes'
import { updateUserMutation } from 'legacy/graphql/mutations/updateUserMutation'

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
