import { useOneSignal } from 'hooks/useOneSignal'
import React from 'react'
import { LogBox } from 'react-native'
import { QueryClient, QueryClientProvider } from 'react-query'
import * as NewRelic from '@bibabovn/react-native-newrelic'

import { UserSettingsContextProvider } from 'contexts/UserSettingsProvider'
import { Main } from './src/Main'

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'Require cycle: index.js',
  'Require cycle: node_modules',
  '`new NativeEventEmitter()`',
  'EventEmitter.removeListener',
])

export const queryClient = new QueryClient()

export const App = () => {
  useOneSignal()

  React.useEffect(() => {
    NewRelic.enableAutoRecordJSUncaughtException()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <UserSettingsContextProvider>
        <Main />
      </UserSettingsContextProvider>
    </QueryClientProvider>
  )
}
