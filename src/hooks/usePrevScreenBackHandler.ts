import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { useBackHandler } from './useBackHandler'

type PrevScreens = 'NOTIFICATIONS' | 'STATS_AND_REQUESTS'

export const usePrevScreenBackHandler = (
  navigation: NavigationProp<ParamListBase>,
  prevScreen?: PrevScreens
) => {
  useBackHandler(() => {
    if (prevScreen) {
      navigation.navigate(prevScreen)
      return true
    }
    return false
  })
}
