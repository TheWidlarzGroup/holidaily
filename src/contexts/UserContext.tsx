import { User } from 'mock-api/models/mirageTypes'
import { createContext } from 'react'

export type ContextProps = {
  user: User | null
  updateUser: (newData: Partial<User>) => void
  handleLogout: () => void
}

export const UserContext = createContext<ContextProps | null>(null)
