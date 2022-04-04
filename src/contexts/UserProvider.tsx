import React, { ReactNode, useState, useCallback } from 'react'
import { User } from 'mock-api/models/mirageTypes'
import axios from 'axios'
import { useCreateTempUser } from 'dataAccess/mutations/useCreateTempUser'
import { setItem, removeMany } from 'utils/localStorage'
import { ContextProps, UserContext } from './UserContext'

type ProviderProps = {
  children: ReactNode
}

export const emptyUser: User = {
  id: '',
  firstName: '',
  lastName: '',
  photo: null,
  email: '',
  confirmed: true,
  occupation: '',
  userColor: '',
  language: 'en',
  role: 'Admin',
  availablePto: 20,
  requests: [],
  teams: [],
}

export const UserContextProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const { reset: clearUserCache } = useCreateTempUser()

  const updateUser = useCallback((newData: Partial<User> | null) => {
    // checking if newData.photo !== user.photo makes updateUser dependend on user and changing its reference in unexpected way
    if (newData?.photo) {
      setItem('photo', newData.photo)
    }
    setUser((usr) => {
      if (usr) return { ...usr, ...newData }
      return { ...emptyUser, ...newData }
    })
  }, [])

  const handleLogout = async () => {
    await removeMany(['firstName', 'lastName', 'occupation', 'photo', 'userColor'])
    delete axios.defaults.headers.common.userId
    clearUserCache()
    setUser(null)
  }

  const value: ContextProps = { user, updateUser, handleLogout }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

UserContextProvider.displayName = 'UserContextProvider'
