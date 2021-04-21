import { createContext } from 'react'

export type UserData = {
  firstName: string
  lastName: string
  email: string
  isConfirmed: boolean
}

export type ContextProps = {
  user: UserData
  handleUserDataChange: (userData: UserData | null) => void
}

export const UserContext = createContext<ContextProps | null>(null)
