import React, { ReactNode, useState, memo, FC, useEffect } from 'react'
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
  const [user, setUser] = useState<UserData | null>(null)
  const { user: fetchedUser, isLoading, error } = useUserData()

  useEffect(() => {
    if (!isLoading && fetchedUser) {
      updateUser({
        ...fetchedUser,
        isConfirmed: fetchedUser.confirmed,
      } as UserData)
    } else if (error) {
      updateUser(emptyUser)
    }
  }, [error, fetchedUser, isLoading])

  const updateUser = (newData: Partial<UserData>) => {
    setUser((usr) => {
      if (usr) return { ...usr, ...newData }
      return { ...emptyUser, ...newData }
    })
  }

  useEffect(() => {
    if (user) SplashScreen.hide()
  }, [user])

  const value: ContextProps = { user, updateUser }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
})

UserContextProvider.displayName = 'UserContextProvider'
