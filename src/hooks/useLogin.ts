import { useNavigation } from '@react-navigation/native'
import { useMutation } from 'react-query'

import { AppNavigationType } from '../navigation/types'
import { LOGIN_USER } from '../utils/mutations/loginUser'

type LoginTypes = {
  email: string
  password: string
}

export const useLogin = () => {
  const navigation = useNavigation<AppNavigationType<'Login'>>()
  const mutation = useMutation(LOGIN_USER)

  const handleLogin = ({ email, password }: LoginTypes) => {
    // To Do
    mutation.mutate({ email, password })
    console.log('email ', email)
    console.log('password', password)
    navigation.navigate('Home')
  }

  return handleLogin
}
