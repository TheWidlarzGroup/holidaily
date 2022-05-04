import { createContext } from 'react'
import { UserSettings } from 'types/userSettingsTypes'

export type ContextProps = {
  userSettings: UserSettings | null
  updateSettings: (newData: Partial<UserSettings>) => void
}

export const UserSettingsContext = createContext<ContextProps | null>(null)
