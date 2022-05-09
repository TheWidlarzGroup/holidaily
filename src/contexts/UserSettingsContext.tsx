import { createContext, Dispatch, SetStateAction } from 'react'

export type UserSettingsContextProps = {
  userSettings: string | null
  updateSettings: Dispatch<SetStateAction<string>>
}

export const UserSettingsContext = createContext<UserSettingsContextProps | null>(null)
