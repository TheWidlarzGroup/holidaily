import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { createAlert } from 'utils/createAlert'
import { ChangeRoleDataTypes, ChangeRoleTypes } from 'types/useChangeRoleTypes'
import { changeRoleMutation } from 'graphqlActions/mutations/changeRoleMutation'
import { ErrorTypes } from 'types/useErrorTypes'

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
  })

  return { handleChangeRole, isLoading, isSuccess }
}
