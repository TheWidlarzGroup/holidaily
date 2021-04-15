import { createContext } from 'react'

export type UserData = {
  firstName: string
  lastName: string
  email: string
}

export type ContextProps = {
  user: UserData
  handleUserDataChange: (userData: UserData) => void
}

export const UserContext = createContext<ContextProps | null>(null)
