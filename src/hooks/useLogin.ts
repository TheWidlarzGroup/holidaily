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

  const { mutate } = useMutation(async (variables) => {
    const {
      token: { token },
    } = await request(
      endpoint,
      gql`
        mutation loginUser($email: ${variables.email}, $password: ${variables.password}) {
          loginUser(email: $email, password: $password) {
            token
          }
        }
      `
    )
    return token
  })

  const handleLogin = ({ email, password }: LoginTypes) => {
    mutate({ email, password } as any)
    console.log('email ', email)
    console.log('password', password)
    navigation.navigate('Home')
  }

  return handleLogin
}
