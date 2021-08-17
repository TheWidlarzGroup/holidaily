import { createContext } from 'react'

export type UserData = {
  firstName: string
  lastName: string
  email: string
  isConfirmed: boolean
  role: string
  occupation: string
  photo?: string | null
}

export type ContextProps = {
  user: UserData | null
  updateUser: (newData: Partial<UserData> | null) => void
}

export const UserContext = createContext<ContextProps | null>(null)
