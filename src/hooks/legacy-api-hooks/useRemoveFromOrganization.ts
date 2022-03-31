import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { createAlert } from 'utils/createAlert'
import {
  RemoveFromOrganizationDataTypes,
  RemoveFromOrganizationTypes,
} from 'types/useRemoveFromOrganizationTypes'
import { removeFromOrganizationMutation } from 'graphqlActions/mutations/removeFromOrganizationMutation'
import { ErrorTypes } from 'types/useErrorTypes'
import { queryClient } from '../../../App'

export const useRemoveFromOrganization = () => {
  const { t } = useTranslation('mutationsErrors')
  const {
    mutate: handleRemoveFromOrganization,
    isLoading,
    isSuccess,
  } = useMutation<RemoveFromOrganizationDataTypes, ErrorTypes, RemoveFromOrganizationTypes>(
    removeFromOrganizationMutation,
    {
      onError: () => {
        createAlert(t('default'), '')
      },
      onSuccess: () => {
        queryClient.invalidateQueries('fetch-users')
      },
    }
  )

  return { handleRemoveFromOrganization, isLoading, isSuccess }
}
