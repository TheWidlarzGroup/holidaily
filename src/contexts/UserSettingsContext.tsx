import { createContext } from 'react'

type UserSettings = {
  darkMode: boolean
}

export type UserSettingsContextProps = {
  userSettings: UserSettings | null
  updateSettings: F1<UserSettings>
}

export const UserSettingsContext = createContext<UserSettingsContextProps | null>(null)
