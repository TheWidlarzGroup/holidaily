import { RequestsContext } from 'contexts/RequestsContext'
import { useContext } from 'react'

export const useRequestsContext = () => {
  const context = useContext(RequestsContext)

  if (context) {
    return context
  }

  throw Error('Use this hook in RequestsProvider scope')
}
