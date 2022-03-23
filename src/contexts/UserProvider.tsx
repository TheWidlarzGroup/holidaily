import { deleteItemAsync } from 'expo-secure-store'
import { authorizedClient } from 'legacy/client'
import React, { ReactNode, useState, memo, FC, useCallback } from 'react'
import { ContextProps, UserContext, UserData } from './UserContext'

type ProviderProps = {
  children: ReactNode
}

export const emptyUser = {
  firstName: '',
  lastName: '',
  email: '',
  isConfirmed: false,
  role: '',
  occupation: '',
  id: '',
  photo: null,
}

export const UserContextProvider: FC<ProviderProps> = memo(({ children }) => {
  const [user, setUser] = useState<UserData | null>(null)

  const updateUser = useCallback((newData: Partial<UserData> | null) => {
    setUser((usr) => {
      if (usr) return { ...usr, ...newData }
      return { ...emptyUser, ...newData }
    })
  }, [])

  const handleLogout = async () => {
    await deleteItemAsync('token')
    authorizedClient.setHeader('Authorization', '')
    setUser(null)
  }

  const value: ContextProps = { user, updateUser, handleLogout }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
})

UserContextProvider.displayName = 'UserContextProvider'
