import { useOneSignal } from 'hooks/useOneSignal'
import React from 'react'
import { LogBox } from 'react-native'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Main } from './src/Main'

export const queryClient = new QueryClient()

export const App = () => {
  useOneSignal()

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    'Setting a timer for a long period of time',
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  )
}
