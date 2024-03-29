import { createContext } from 'react'

export type UserSettings = {
  darkMode?: boolean
  hasUserSeenCalendar?: boolean
  pickedDate?: {
    startDate?: Date
    endDate?: Date
  }
}

export type UserSettingsContextProps = {
  userSettings: UserSettings | null
  updateSettings: F1<UserSettings>
}

export const UserSettingsContext = createContext<UserSettingsContextProps | null>(null)
