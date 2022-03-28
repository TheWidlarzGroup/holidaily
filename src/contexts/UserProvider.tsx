import { deleteItemAsync } from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { authorizedClient } from 'graphqlActions/client'
import React, { ReactNode, useState, useCallback, useEffect } from 'react'
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
const PROFILE_PIC_STORE_KEY = 'profile-pic'
export const UserContextProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    const loadImageIfPossible = async () => {
      const profilePic = await AsyncStorage.getItem(PROFILE_PIC_STORE_KEY)
      if (profilePic?.length)
        setUser((old) =>
          old ? { ...old, photo: profilePic } : { ...emptyUser, photo: profilePic }
        )
    }
    loadImageIfPossible()
  }, [])

  const updateUser = useCallback(
    (newData: Partial<UserData> | null) => {
      if (newData?.photo && newData.photo !== user?.photo) {
        AsyncStorage.setItem(PROFILE_PIC_STORE_KEY, newData.photo)
      }
      setUser((usr) => {
        if (usr) return { ...usr, ...newData }
        return { ...emptyUser, ...newData }
      })
    },
    [user?.photo]
  )

  const handleLogout = async () => {
    await deleteItemAsync('token')
    authorizedClient.setHeader('Authorization', '')
    setUser(null)
  }

  const value: ContextProps = { user, updateUser, handleLogout }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

UserContextProvider.displayName = 'UserContextProvider'
