import React, { ReactNode, useState, memo, FC, useEffect } from 'react'
import { USER_DATA } from 'utils/mocks/userMocks'
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
  photo: null,
}

export const UserContextProvider: FC<ProviderProps> = memo(({ children }) => {
  const [user, setUser] = useState<UserData>(emptyUser)

  useEffect(() => {
    // Comment: Mocking user data, remove when BE ready
    if (!user.isConfirmed) return
    updateUser(USER_DATA)
  }, [user.isConfirmed])

  const updateUser = (newData: Partial<UserData>) => {
    setUser((usr) => ({ ...usr, ...newData }))
  }

  const value: ContextProps = { user, updateUser }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
})

UserContextProvider.displayName = 'UserContextProvider'
