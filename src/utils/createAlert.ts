import { Alert } from 'react-native'

export const createAlert = (errorTitle: string, errorMessage: string, navigateFunc?: () => void) =>
  Alert.alert(errorTitle, errorMessage, [
    {
      text: 'Ok',
      onPress: navigateFunc,
    },
  ])
