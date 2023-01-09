import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native'

import { useCallback, useEffect, useState } from 'react'
import { useBackHandler } from './useBackHandler'

export type PrevScreen = 'NOTIFICATIONS' | 'STATS_AND_REQUESTS' | 'DashboardNavigation' | undefined

export const usePrevScreenBackHandler = (prevScreen: PrevScreen, avoidResetParams?: boolean) => {
  const [cachedPrevScreen, setCachedPrevScreen] = useState<PrevScreen>()

  const navigation = useNavigation<any>()
  const isFocused = useIsFocused()

  useEffect(() => {
    if (!isFocused) setCachedPrevScreen(undefined)
  }, [isFocused])

  useFocusEffect(
    useCallback(() => {
      if (prevScreen) setCachedPrevScreen(prevScreen)
      if (!avoidResetParams) navigation.setParams({ prevScreen: undefined })

      // Comment: we don't want to track navigation
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prevScreen])
  )

  useBackHandler(() => {
    if (cachedPrevScreen) {
      navigation.navigate(cachedPrevScreen)
      return true
    }
    return false
  })
}
