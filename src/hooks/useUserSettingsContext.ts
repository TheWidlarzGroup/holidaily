import { useContext } from 'react'
import { UserSettingsContext } from 'contexts/UserSettingsContext'

export const useUserSettingsContext = () => {
  const context = useContext(UserSettingsContext)

  if (context) {
    return context
  }

  throw Error('Use this hook in UserSettingsProvider scope')
}
