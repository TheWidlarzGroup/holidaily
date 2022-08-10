import { User } from 'mock-api/models/mirageTypes'
import { createContext } from 'react'

export type ContextProps = {
  user: User | null
  updateUser: (newData: Partial<User> | null, config?: { updateTeamsData: boolean }) => void
  handleLogout: F0
}

export const UserContext = createContext<ContextProps | null>(null)
