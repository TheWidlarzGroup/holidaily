import { Alert } from 'react-native'

export const createAlert = (erroTitle: string, errorMessage: string) =>
  Alert.alert(erroTitle, errorMessage, [
    {
      text: 'Ok',
    },
  ])
