import { createAlert } from 'utils/createAlert'
import { useMutation } from 'react-query'
import { useTranslation } from 'react-i18next'
import {
  ErrorTypes,
  ChangePasswordDataTypes,
  ChangePasswordTypes,
} from 'types/useChangePasswordTypes'
import { changePasswordMutation } from 'graphqlActions/mutations/changePasswordMutation'

export const useChangePassword = () => {
  const { t } = useTranslation('mutationsErrors')
  const {
    mutate: handleChangePassword,
    isLoading,
    isSuccess,
  } = useMutation<ChangePasswordDataTypes, ErrorTypes, ChangePasswordTypes>(
    changePasswordMutation,
    {
      onError: (e) => {
        if (e.message.includes('invalid_credentials'))
          return createAlert(t('invalidCredentialsPassword'), '')

        createAlert(t('default'), '')
      },
    }
  )

  return { handleChangePassword, isLoading, isSuccess }
}
