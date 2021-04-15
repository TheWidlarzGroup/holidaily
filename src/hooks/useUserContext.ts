import { useContext } from 'react'
import { UserContext } from 'contexts/UserContext'

export const useUserContext = () => {
  const context = useContext(UserContext)

  if (context) {
    return context
  }

  throw Error('Use this hook in UserProvider scope')
}
