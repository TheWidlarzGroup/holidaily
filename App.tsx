import { useOneSignal } from 'hooks/useOneSignal'
import React from 'react'
import { QueryClient /* , QueryClientProvider */ } from 'react-query'
import { Main } from './src/Main'

// used by legacy hooks
export const queryClient = new QueryClient()

export const App = () => {
  useOneSignal()

  return (
    // <QueryClientProvider client={queryClient}>
    <Main />
    // </QueryClientProvider>
  )
}
