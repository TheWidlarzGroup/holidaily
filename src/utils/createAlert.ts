import { Alert } from 'react-native'

export const createAlert = (errorTitle: string, errorMessage: string) =>
  Alert.alert(errorTitle, errorMessage, [
    {
      text: 'Ok',
    },
  ])
