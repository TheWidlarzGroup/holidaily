import { createContext } from 'react'

export type UserData = {
  firstName: string
  lastName: string
  email: string
  isConfirmed: boolean
}

export type ContextProps = {
  user: UserData
  updateUser: (newData: Partial<UserData>) => void
}

export const UserContext = createContext<ContextProps | null>(null)
