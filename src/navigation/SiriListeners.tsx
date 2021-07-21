import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SiriShortcutsEvent } from 'react-native-siri-shortcut'

export const SiriListeners = () => {
  const navigation = useNavigation()
  useEffect(() => {
    SiriShortcutsEvent.addListener('SiriShortcutListener', ({ activityType, userInfo }) => {
      if (activityType === 'com.holidaily.AddRequest') {
        console.log(userInfo)
        navigation.navigate('RequestVacation')
      }
    })
    return () => {
      SiriShortcutsEvent.removeListener('SiriShortcutListener', () => {})
    }
  }, [navigation])
  return null
}
