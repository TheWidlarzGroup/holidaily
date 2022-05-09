import { useAsyncStorage } from 'hooks/useAsyncStorage'
import React, { ReactNode } from 'react'
import { UserSettingsContextProps, UserSettingsContext } from './UserSettingsContext'

type ProviderProps = {
  children: ReactNode
}

export const UserSettingsContextProvider = ({ children }: ProviderProps) => {
  const [userSettings, updateSettings] = useAsyncStorage('userSettings', '')

  const value: UserSettingsContextProps = { userSettings, updateSettings }
  return <UserSettingsContext.Provider value={value}>{children}</UserSettingsContext.Provider>
}
