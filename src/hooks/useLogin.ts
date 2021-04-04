import { useNavigation } from '@react-navigation/native'

import { useMutation } from 'react-query'
import request, { gql } from 'graphql-request'
import { AppNavigationType } from '../navigation/types'

type LoginTypes = {
  email: string
  password: string
}

const endpoint = 'https://holidaily.danielgrychtol.com/api/graphiql'

export const useLogin = () => {
  const navigation = useNavigation<AppNavigationType<'Login'>>()

  const { mutate } = useMutation<void, unknown, LoginTypes>(
    async ({ email, password }: LoginTypes) => {
      const {
        token: { token },
      } = await request(
        endpoint,
        gql`
        mutation{
          loginUser(email: ${email}, password: ${password}) {
            token
          }
        }
      `
      )
      return token
    }
  )

  const handleLogin = ({ email, password }: LoginTypes) => {
    const variables = { email, password }
    mutate(variables)

    console.log('email ', email)
    console.log('password', password)
    navigation.navigate('Home')
  }

  return handleLogin
}
