import React, { ReactNode, useState, useCallback } from 'react'
import { UserSettingsContextProps, UserSettings, UserSettingsContext } from './UserSettingsContext'

type ProviderProps = {
  children: ReactNode
}

export const defaultUserSettings: UserSettings = {
  darkMode: false,
}

export const UserSettingsContextProvider = ({ children }: ProviderProps) => {
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null)
  const updateSettings = useCallback(
    (newData: Partial<UserSettings> | null) =>
      setUserSettings((settings) =>
        settings ? { ...settings, ...newData } : { ...defaultUserSettings, ...newData }
      ),
    []
  )

  const value: UserSettingsContextProps = { userSettings, updateSettings }
  return <UserSettingsContext.Provider value={value}>{children}</UserSettingsContext.Provider>
}
