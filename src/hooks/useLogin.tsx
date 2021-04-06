import { useNavigation } from '@react-navigation/native'

import { useMutation } from 'react-query'
import request, { gql } from 'graphql-request'
import { AppNavigationType } from '../navigation/types'

type LoginTypes = {
  email: string
  password: string
}

type UserTypes = {
  loginUser: {
    token: string
    user: {
      confirmed: boolean | null
    }
  }
}

const endpoint = 'https://holidaily.danielgrychtol.com/api/graphiql'

export const useLogin = () => {
  const navigation = useNavigation<AppNavigationType<'Login'>>()
  const { mutateAsync: handleLoginUser, isLoading } = useMutation<UserTypes, unknown, LoginTypes>(
    async ({ email, password }: LoginTypes) =>
      request(
        endpoint,
        gql`
        mutation{
          loginUser(email: "${email}", password: "${password}") {
            token
            user{
              confirmed
            }
          }
        }
      `
      ),

    {
      onSuccess: (data: UserTypes) => {
        const { confirmed } = data.loginUser.user
        if (confirmed) {
          navigation.navigate('Home')
        } else {
          console.log(confirmed)
        }
      },
    }
  )

  const handleLogin = async ({ email, password }: LoginTypes) => {
    try {
      await handleLoginUser({ email, password })
    } catch (error) {
      console.log('error', error)
    }
  }

  return { isLoading, handleLogin }
}
