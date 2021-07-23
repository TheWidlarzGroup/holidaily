import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SiriShortcutsEvent, suggestShortcuts } from 'react-native-siri-shortcut'
import { sickday } from 'utils/siriShortcuts'

export const useSiriListeners = () => {
  const navigation = useNavigation()

  useEffect(() => {
    suggestShortcuts([sickday])
  }, [])

  useEffect(() => {
    SiriShortcutsEvent.addListener('SiriShortcutListener', ({ activityType, userInfo }) => {
      if (activityType === 'com.holidaily.AddRequest') {
        navigation.navigate('RequestVacation', userInfo)
      }
    })
    return () => {
      SiriShortcutsEvent.removeListener('SiriShortcutListener', () => {})
    }
  }, [navigation])
}
