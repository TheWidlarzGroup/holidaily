import { useState } from 'react'
import { useMutation } from 'react-query'

import { loginMutation } from 'graphqlActions/mutations/loginMutation'
import { UserTypes, ErrorTypes, LoginTypes } from 'types/useLoginTypes'
import { useTranslation, TFunction } from 'react-i18next'
import { useUserContext } from './useUserContext'

const customErrorMessage = (translate: TFunction<'mutationsErrors'>, errorMessage: string) => {
  if (errorMessage?.startsWith('invalid_credentials')) {
    return translate('invalidCredentials')
  }
  return translate('default')
}

export const useLogin = () => {
  const [loginErrorMessage, setLoginErrorMessage] = useState('')
  const { t } = useTranslation('mutationsErrors')
  const { updateUser } = useUserContext()
  const { mutate: handleLoginUser, isLoading } = useMutation<UserTypes, ErrorTypes, LoginTypes>(
    loginMutation,
    {
      onSuccess: (data: UserTypes) => {
        const { user } = data.loginUser

        if (user.confirmed) {
          updateUser({ ...user, isConfirmed: user.confirmed })
        } else {
          const errorMessage = 'Please confirm your account'

          setLoginErrorMessage(errorMessage)
        }
      },
      onError: (error: ErrorTypes) => {
        const errorMessage = customErrorMessage(t, error.message)

        setLoginErrorMessage(errorMessage)
      },
    }
  )

  return { handleLoginUser, isLoading, loginErrorMessage }
}
