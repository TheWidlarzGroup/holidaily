import { useState } from 'react'
import { useMutation } from 'react-query'

import { loginMutation } from 'graphqlActions/mutations/loginMutation'
import { UserTypes, ErrorTypes, LoginTypes } from 'types/useLoginTypes'
import { useTranslation, TFunction } from 'react-i18next'
import { deleteItemAsync, setItemAsync } from 'expo-secure-store'
import { emptyUser } from 'contexts/UserProvider'
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
      onSuccess: async (data: UserTypes) => {
        const { token, user } = data.loginUser

        if (user.confirmed) {
          updateUser({ ...user, isConfirmed: user.confirmed })
          await setItemAsync('token', token)
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

  const handleLogout = async () => {
    await deleteItemAsync('token')
    updateUser(emptyUser)
  }

  return { handleLoginUser, isLoading, loginErrorMessage, handleLogout }
}
