import { User } from 'mock-api/models/mirageTypes'
import { createContext } from 'react'

export type ContextProps = {
  user: User | null
  updateUser: F1<Partial<User>>
  handleLogout: F0
}

export const UserContext = createContext<ContextProps | null>(null)
