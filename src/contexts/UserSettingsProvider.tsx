import React, { ReactNode, useState, useEffect } from 'react'
import { Appearance } from 'react-native'
import { getItem, setItem } from 'utils/localStorage'
import { UserSettingsContextProps, UserSettings, UserSettingsContext } from './UserSettingsContext'

type ProviderProps = {
  children: ReactNode
}

export const defaultUserSettings: UserSettings = {
  darkMode: Appearance.getColorScheme() === 'dark',
}

export const UserSettingsContextProvider = ({ children }: ProviderProps) => {
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null)

  const updateSettings = (newData: Partial<UserSettings> | null) => {
    if (userSettings && newData) {
      setUserSettings({ ...userSettings, ...newData })
    }
  }

  useEffect(() => {
    getItem('userSettings')
      .then((res) => {
        if (res) {
          setUserSettings(JSON.parse(res))
        } else {
          setUserSettings(defaultUserSettings)
        }
      })
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    setItem('userSettings', JSON.stringify(userSettings))
  }, [userSettings])

  const value: UserSettingsContextProps = { userSettings, updateSettings }
  return <UserSettingsContext.Provider value={value}>{children}</UserSettingsContext.Provider>
}
