import { useOneSignal } from 'hooks/useOneSignal'
import React, { useEffect } from 'react'
import { LogBox } from 'react-native'
import { QueryClient, QueryClientProvider } from 'react-query'
import { UserSettingsContextProvider } from 'contexts/UserSettingsProvider'
import { Analytics } from 'services/analytics'
import { Main } from './src/Main'

LogBox.ignoreLogs([
  'Require cycle: index.js',
  'Require cycle: node_modules',
  '`new NativeEventEmitter()`',
  'EventEmitter.removeListener',
])

export const queryClient = new QueryClient()

export const App = () => {
  useOneSignal()

  useEffect(() => {
    const launchAnalytics = async () => {
      const userId = await Analytics().setUserId()
      Analytics().identify({ id: userId })
      Analytics().track('APP_LAUNCH')
    }
    launchAnalytics()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <UserSettingsContextProvider>
        <Main />
      </UserSettingsContextProvider>
    </QueryClientProvider>
  )
}
