import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SiriShortcutsEvent, suggestShortcuts } from 'react-native-siri-shortcut'
import { sickday } from 'utils/siriShortcuts'
import { DrawerNavigationType, DrawerRoutes } from 'navigation/types'

export const useSiriListeners = <T extends keyof DrawerRoutes>() => {
  const navigation = useNavigation<DrawerNavigationType<T>>()

  useEffect(() => {
    suggestShortcuts([sickday])
  }, [])

  useEffect(() => {
    const listener = SiriShortcutsEvent.addListener(
      'SiriShortcutListener',
      ({ activityType, userInfo }) => {
        if (activityType === 'com.holidaily.AddRequest') {
          navigation.navigate('REQUEST_VACATION', userInfo)
        }
      }
    )
    return () => {
      listener?.remove()
    }
  }, [navigation])
}
