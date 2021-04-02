import { useNavigation } from '@react-navigation/native'
import { AppNavigationType } from '../navigation/types'

type LoginTypes = {
  email: string
  password: string
}

export const useLogin = () => {
  const navigation = useNavigation<AppNavigationType<'Login'>>()

  const handleLogin = ({ email, password }: LoginTypes) => {
    // TODO matthew: Handle Login !
    console.log('email ', email)
    console.log('password', password)
    navigation.navigate('Home')
  }

  return handleLogin
}
