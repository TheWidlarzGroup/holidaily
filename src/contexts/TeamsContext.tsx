import { createContext } from 'react'
import { Team, User } from 'mock-api/models/mirageTypes'

export type ContextProps = {
  teams: Team[] | undefined
  updateTeams: (newData: Team[]) => void
  allUsers: User[] | undefined
}

export const TeamsContext = createContext<ContextProps | null>(null)
