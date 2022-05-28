import React, { ReactNode, useState, useCallback, useEffect } from 'react'
import { User } from 'mock-api/models/mirageTypes'
import axios from 'axios'
import { useCreateTempUser } from 'dataAccess/mutations/useCreateTempUser'
import { removeMany } from 'utils/localStorage'
import { queryClient } from 'dataAccess/queryClient'
import { QueryKeys } from 'dataAccess/QueryKeys'
import { sortSingleUserRequests } from 'utils/sortByDate'
import { Analytics } from 'services/analytics'
import { entries } from 'utils/manipulation'
import { useBooleanState } from 'hooks/useBooleanState'
import { generateUUID } from 'utils/generateUUID'
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
  const [isAppLaunched, { setTrue: setIsAppLaunched }] = useBooleanState(false)

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
      'id',
      'firstName',
      'lastName',
      'occupation',
      'photo',
      'userColor',
      'seenNotificationsIds',
      'seenTeamsModal',
    ])
  }

  useEffect(() => {
    if (user?.id && !isAppLaunched) {
      setIsAppLaunched()
      Analytics().setUserId(user.id + generateUUID())
      // TODO: generateUUID added temporarily to distinguish users by unique ID, remove it if unique ID provided by backend
    }
  }, [user, isAppLaunched, setIsAppLaunched])

  useEffect(() => {
    if (!user?.requests?.length) return
    const sortedRequests = user?.requests.sort(sortSingleUserRequests)
    updateUser({ requests: sortedRequests })
  }, [updateUser, user?.requests])

  useEffect(() => {
    if (user) {
      for (const [key, val] of entries(user)) {
        Analytics().identify({ [key]: JSON.stringify(val) })
      }
    }
  }, [user])

  const value: ContextProps = {
    user,
    updateUser,
    handleLogout,
  }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

UserContextProvider.displayName = 'UserContextProvider'
