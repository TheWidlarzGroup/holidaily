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
  const { mutate } = useMutation(LOGIN_USER)

  const handleLogin = ({ email, password }: LoginTypes) => {
    // TODO matthew: Handle Login !
    mutate(console.log('xd'))
    console.log('email ', email)
    console.log('password', password)
    navigation.navigate('Home')
  }

  return handleLogin
}
