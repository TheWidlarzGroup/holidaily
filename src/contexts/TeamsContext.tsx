import { createContext } from 'react'
import { Team, User } from 'mock-api/models/mirageTypes'

export type TeamsContextProps = {
  teams: Team[]
  updateTeams: (newData: Team[]) => void
  allUsers: User[]
}

export const TeamsContext = createContext<TeamsContextProps | null>(null)
