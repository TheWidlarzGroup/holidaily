import { useOneSignal } from 'hooks/useOneSignal'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Main } from './src/Main'

const queryClient = new QueryClient()

export const App = () => {
  useOneSignal({
    id: '9bec158a-f8d1-4d53-a5c7-b4dfe27674d8',
  })
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  )
}
