import { useContext } from 'react'
import { UserContext } from 'contexts/UserContext'

const useUserContext = () => {
  const context = useContext(UserContext)

  if (context) {
    return context
  }

  throw Error('Use this hook in UserProvider scope')
}

export default useUserContext
