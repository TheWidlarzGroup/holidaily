import { useContext } from 'react'
import { TeamsContext } from 'contexts/TeamsContext'

export const useTeamsContext = () => {
  const context = useContext(TeamsContext)

  if (context) {
    return context
  }

  throw Error('Use this hook in TeamsProvider scope')
}
