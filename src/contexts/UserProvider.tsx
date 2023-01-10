import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { User } from 'mock-api/models/mirageTypes'
import axios from 'axios'
import { useCreateTempUser } from 'dataAccess/mutations/useCreateTempUser'
import { getItem, removeMany, setItem } from 'utils/localStorage'
import { queryClient } from 'dataAccess/queryClient'
import { QueryKeys } from 'dataAccess/QueryKeys'
import { sortSingleUserRequests } from 'utils/sortByDate'
import { Analytics } from 'services/analytics'
import { entries } from 'utils/manipulation'
import { generateUUID } from 'utils/generateUUID'
import { useAsyncEffect } from 'hooks/useAsyncEffect'
import { ContextProps, UserContext } from './UserContext'

type ProviderProps = {
  children: ReactNode
}

const defaultUser: User = {
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
  blockedPostsIds: [],
}

export const UserContextProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const { reset: clearUserCache } = useCreateTempUser()

  const updateUser = useCallback((newData: Partial<User> | null) => {
    setUser((prev) => (prev ? { ...prev, ...newData } : { ...defaultUser, ...newData }))
  }, [])
  console.log('user', user?.blockedPostsIds)

  useAsyncEffect(async () => {
    const cachedUserId = await getItem('userId')
    if (cachedUserId) return

    const userId = generateUUID()
    setItem('userId', userId)
    Analytics().setUserId(cachedUserId || userId)
  }, [])

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

  const handleLogout = async () => {
    setUser(null)
    delete axios.defaults.headers.common.userId
    clearUserCache()
    queryClient.invalidateQueries(QueryKeys.NOTIFICATIONS)
    queryClient.invalidateQueries(QueryKeys.USER_REQUESTS)
    queryClient.invalidateQueries(QueryKeys.USER_STATS)
    queryClient.invalidateQueries(QueryKeys.ORGANIZATION)
    queryClient.invalidateQueries(QueryKeys.POSTS)
    await removeMany([
      'userId',
      'firstName',
      'lastName',
      'occupation',
      'photo',
      'userColor',
      'seenNotificationsIds',
      'seenTeamsModal',
      'draftPost',
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
