import { useNavigation } from '@react-navigation/native'
import request from 'graphql-request'
import { useMutation } from 'react-query'

import { AppNavigationType } from '../navigation/types'
import { LOGIN_USER } from '../utils/mutations/loginUser'

type LoginTypes = {
  email: string
  password: string
}

const endpoint = 'https://holidaily.danielgrychtol.com/api/graphiql'

export const useLogin = () => {
  const navigation = useNavigation<AppNavigationType<'Login'>>()

  const { mutate } = useMutation('token', async () => {
    const {
      token: { token },
    } = await request(endpoint, LOGIN_USER)
    return token
  })

  const handleLogin = ({ email, password }: LoginTypes) => {
    mutate({ email, password })
    console.log('email ', email)
    console.log('password', password)
    navigation.navigate('Home')
  }

  return handleLogin
}
