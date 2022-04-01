import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { ReactNode, useState, useCallback } from 'react'
import { User } from 'mock-api/models/mirageTypes'
import axios from 'axios'
import { useCreateTempUser } from 'dataAccess/mutations/useCreateTempUser'
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

export const PROFILE_PIC_STORE_KEY = 'profile-pic'
export const UserContextProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const { reset: clearUserCache } = useCreateTempUser()

  const updateUser = useCallback((newData: Partial<User> | null) => {
    // checking if newData.photo !== user.photo makes updateUser dependend on user and changing its reference in unexpected way
    if (newData?.photo) {
      AsyncStorage.setItem(PROFILE_PIC_STORE_KEY, newData.photo)
    }
    setUser((usr) => {
      if (usr) return { ...usr, ...newData }
      return { ...emptyUser, ...newData }
    })
  }, [])

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(['firstName', 'lastName', 'occupation', PROFILE_PIC_STORE_KEY])
    delete axios.defaults.headers.common.userId
    clearUserCache()
    setUser(null)
  }

  const value: ContextProps = { user, updateUser, handleLogout }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

UserContextProvider.displayName = 'UserContextProvider'
