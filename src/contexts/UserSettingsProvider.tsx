import React, { ReactNode, useState, useEffect, useLayoutEffect } from 'react'
import { Appearance } from 'react-native'
import { getItem, setItem } from 'utils/localStorage'
import { UserSettingsContextProps, UserSettings, UserSettingsContext } from './UserSettingsContext'

type ProviderProps = {
  children: ReactNode
}

export const defaultUserSettings: UserSettings = {
  darkMode: Appearance.getColorScheme() === 'dark',
  hasUserSeenCalendar: false,
  pickedDate: undefined,
}

export const UserSettingsContextProvider = ({ children }: ProviderProps) => {
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null)

  const updateSettings = (newData: Partial<UserSettings> | null) => {
    setUserSettings((prevSettings) =>
      prevSettings ? { ...prevSettings, ...newData } : { ...defaultUserSettings, ...newData }
    )
  }

  useLayoutEffect(() => {
    updateSettings({ pickedDate: new Date() })
  }, [])

  useEffect(() => {
    const getItemFn = async () => {
      const data = await getItem('userSettings')
      if (data) setUserSettings(JSON.parse(data))
      else setUserSettings(defaultUserSettings)
    }
    getItemFn()
  }, [])

  useEffect(() => {
    const userSettingsClone = { ...userSettings }
    delete userSettingsClone.pickedDate
    setItem('userSettings', JSON.stringify(userSettingsClone))
  }, [userSettings])

  const value: UserSettingsContextProps = { userSettings, updateSettings }
  return <UserSettingsContext.Provider value={value}>{children}</UserSettingsContext.Provider>
}
