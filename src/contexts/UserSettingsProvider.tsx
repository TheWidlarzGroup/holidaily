import React, { ReactNode, useState, useEffect } from 'react'
import { Appearance } from 'react-native'
import { getItem, setItem } from 'utils/localStorage'
import { UserSettingsContextProps, UserSettings, UserSettingsContext } from './UserSettingsContext'

type ProviderProps = {
  children: ReactNode
}

export const defaultUserSettings: UserSettings = {
  darkMode: Appearance.getColorScheme() === 'dark',
  hasUserSeenCalendar: false,
}

export const UserSettingsContextProvider = ({ children }: ProviderProps) => {
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null)

  const updateSettings = (newData: Partial<UserSettings> | null) => {
    if (!newData) return
    setUserSettings((set) =>
      set ? { ...set, ...newData } : { ...defaultUserSettings, ...newData }
    )
  }

  useEffect(() => {
    const getItemFn = async () => {
      const data = await getItem('userSettings')
      console.log(data)
      if (data) setUserSettings(JSON.parse(data))
      else setUserSettings(defaultUserSettings)
    }
    getItemFn()
  }, [])

  useEffect(() => {
    setItem('userSettings', JSON.stringify(userSettings))
  }, [userSettings])

  const value: UserSettingsContextProps = { userSettings, updateSettings }
  return <UserSettingsContext.Provider value={value}>{children}</UserSettingsContext.Provider>
}
