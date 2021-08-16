import React, { ReactNode, useState, memo, FC, useEffect } from 'react'
import { getItemAsync } from 'expo-secure-store'
import { useUserData } from 'hooks/useUserData'
import SplashScreen from 'react-native-splash-screen'
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
  photo: null,
}

export const UserContextProvider: FC<ProviderProps> = memo(({ children }) => {
  const [user, setUser] = useState<UserData>(emptyUser)
  const { user: fetchedUser, isLoading, error } = useUserData()

  useEffect(() => {
    const func = async () => {
      const token = await getItemAsync('token')
      if (token !== null && !isLoading) {
        updateUser({
          ...fetchedUser,
          isConfirmed: fetchedUser.confirmed,
        } as UserData)
      } else if (error) {
        updateUser(emptyUser)
      }
    }
    func()
  }, [error, fetchedUser, isLoading])

  const updateUser = (newData: Partial<UserData>) => {
    setUser((usr) => ({ ...usr, ...newData }))
  }

  useEffect(() => {
    if (user.email !== '') SplashScreen.hide()
  }, [user])

  const value: ContextProps = { user, updateUser }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
})

UserContextProvider.displayName = 'UserContextProvider'
