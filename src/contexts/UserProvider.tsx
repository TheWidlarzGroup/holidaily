import React, { ReactNode, useState, useCallback } from 'react'
import { User } from 'mock-api/models/mirageTypes'
import axios from 'axios'
import { useCreateTempUser } from 'dataAccess/mutations/useCreateTempUser'
import { removeMany } from 'utils/localStorage'
import { queryClient } from 'dataAccess/queryClient'
import { QueryKeys } from 'dataAccess/QueryKeys'
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
  isOnHoliday: false,
  requests: [],
  teams: [],
}

export const UserContextProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<User | null>(null)

  const { reset: clearUserCache } = useCreateTempUser()
  const updateUser = useCallback(
    (newData: Partial<User> | null) =>
      setUser((usr) => (usr ? { ...usr, ...newData } : { ...emptyUser, ...newData })),
    []
  )
  const handleLogout = async () => {
    setUser(null)
    delete axios.defaults.headers.common.userId
    clearUserCache()
    queryClient.invalidateQueries(QueryKeys.NOTIFICATIONS)
    queryClient.invalidateQueries(QueryKeys.USER_REQUESTS)
    queryClient.invalidateQueries(QueryKeys.USER_STATS)
    queryClient.invalidateQueries(QueryKeys.ORGANIZATION)
    await removeMany([
      'firstName',
      'lastName',
      'occupation',
      'photo',
      'userColor',
      'seenNotificationsIds',
    ])
  }

  const value: ContextProps = {
    user,
    updateUser,
    handleLogout,
  }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

UserContextProvider.displayName = 'UserContextProvider'
