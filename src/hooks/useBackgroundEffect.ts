import { useCallback, useEffect, useRef } from 'react'
import { AppState, AppStateStatus } from 'react-native'

export const useBackgroundEffect = (callback: () => void) => {
  const appState = useRef(AppState.currentState)

  const handleAppStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background') {
        callback()
      }
      appState.current = nextAppState
    },
    [callback]
  )
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange)
    return () => {
      AppState.removeEventListener('change', handleAppStateChange)
    }
  }, [handleAppStateChange])
}
