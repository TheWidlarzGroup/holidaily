import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { createAlert } from 'utils/createAlert'
import { ChangeRoleDataTypes, ChangeRoleTypes } from 'types/useChangeRoleTypes'
import { changeRoleMutation } from 'graphqlActions/mutations/changeRoleMutation'
import { ErrorTypes } from 'types/useErrorTypes'
import { queryClient } from '../../App'

export const useChangeRole = () => {
  const { t } = useTranslation('mutationsErrors')
  const {
    mutate: handleChangeRole,
    isLoading,
    isSuccess,
  } = useMutation<ChangeRoleDataTypes, ErrorTypes, ChangeRoleTypes>(changeRoleMutation, {
    onError: () => {
      createAlert(t('default'), '')
    },
    onSuccess: () => {
      queryClient.invalidateQueries('fetch-users')
    },
  })

  return { handleChangeRole, isLoading, isSuccess }
}
