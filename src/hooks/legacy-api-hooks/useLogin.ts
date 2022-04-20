import { useState } from 'react'
import { useMutation } from 'react-query'
import { loginMutation } from 'graphqlActions/mutations/loginMutation'
import { ErrorTypes, LoginTypes, LoginUserTypes } from 'types/useLoginTypes'
import { useTranslation, TFunction } from 'react-i18next'
import { authorizeClient } from 'graphqlActions/client'
import { useUserContext } from 'hooks/useUserContext'
import { setItem } from 'utils/localStorage'
// import { setItemAsync } from 'expo-secure-store'

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
  const { mutate: handleLoginUser, isLoading } = useMutation<
    LoginUserTypes,
    ErrorTypes,
    LoginTypes
  >(loginMutation, {
    onSuccess: async (data: LoginUserTypes) => {
      const { token, user } = data.loginUser

      if (user.confirmed) {
        updateUser({ ...user, confirmed: user.confirmed })
        // token is not used in demo
        // await setItemAsync('token', token)
        await setItem('hideSlider', 'true')
        authorizeClient(token)
      } else {
        const errorMessage = 'Please confirm your account'

        setLoginErrorMessage(errorMessage)
      }
    },
    onError: (error: ErrorTypes) => {
      const errorMessage = customErrorMessage(t, error.message)

      setLoginErrorMessage(errorMessage)
    },
  })

  return { handleLoginUser, isLoading, loginErrorMessage }
}
