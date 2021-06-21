import React, { ReactNode, useState, memo, FC } from 'react'
import { ContextProps, UserContext, UserData } from './UserContext'

type ProviderProps = {
  children: ReactNode
}

export const emptyUser = {
  firstName: 'Joe',
  lastName: '',
  email: '',
  isConfirmed: false,
}

export const UserContextProvider: FC<ProviderProps> = memo(({ children }) => {
  const [user, setUser] = useState(emptyUser)

  const updateUser = (newData: Partial<UserData>) => {
    setUser((usr) => ({ ...usr, ...newData }))
  }

  const value: ContextProps = { user, updateUser }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
})

UserContextProvider.displayName = 'UserContextProvider'
