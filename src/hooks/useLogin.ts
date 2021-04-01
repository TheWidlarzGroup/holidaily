import { useNavigation } from '@react-navigation/native'
import { AppNavigationType } from '../navigation/types'

type LoginTypes = {
  email: string
  password: string
}

export const useLogin = ({ email, password }: LoginTypes) => {
  const navigation = useNavigation<AppNavigationType<'Login'>>()

  const handleLogin = () => {
    // To Do
    console.log('email ', email)
    console.log('password ', password)
    navigation.navigate('Home')
  }

  return handleLogin
}
