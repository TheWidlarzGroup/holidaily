import { DrawerActions, useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { BackHandler } from 'react-native'

export const useBackToDrawerOnBackPress = () => {
  const navigation = useNavigation()
  useEffect(() => {
    const backAction = () => {
      navigation.goBack()
      navigation.dispatch(DrawerActions.openDrawer())
      return true
    }

    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction)
  }, [navigation])
}
