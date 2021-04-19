import React, { ReactNode, useState, memo, FC } from 'react'
import { ContextProps, UserContext, UserData } from './UserContext'

type ProviderProps = {
  children: ReactNode
}

const testUser = {
  firstName: '',
  lastName: '',
  email: '',
  isConfirmed: false,
}

export const UserContextProvider: FC<ProviderProps> = memo(({ children }) => {
  const [user, setUser] = useState(testUser)

  const handleUserDataChange = (userData: UserData) => {
    setUser(userData)
  }

  const value: ContextProps = { user, handleUserDataChange }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
})
