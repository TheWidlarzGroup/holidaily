import { useContext } from 'react'
import { RouteContext } from 'contexts/RouteContext'

export const useRouteContext = () => {
  const context = useContext(RouteContext)

  if (context) {
    return context
  }

  throw Error('Use this hook in RouteContextProvider scope')
}
