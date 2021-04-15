import * as React from 'react'

type UserData = {
  firstName: string
  lastName: string
  email: string
}

interface ContextProps {
  user: UserData
  handleUserDataChange: (userData: UserData) => void
}

export const UserContext = React.createContext<ContextProps>({
  user: {
    firstName: '',
    lastName: '',
    email: '',
  },
  handleUserDataChange: () => ({}),
})

const testUser = {
  firstName: '',
  lastName: '',
  email: '',
}

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState(testUser)

  const handleUserDataChange = (userData: UserData) => {
    setUser(userData)
  }

  const value: ContextProps = { user, handleUserDataChange }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
