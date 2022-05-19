import { createContext } from 'react'
import { Team, User } from 'mock-api/models/mirageTypes'

type AddUserToTeamsOptions = { withReset?: true }

export type TeamsContextProps = {
  teams: Team[]
  updateTeams: (newData: Team[]) => void
  allUsers: User[]
  addUserToTeams: (u: User, t: string[], o?: AddUserToTeamsOptions) => void
  reset: F0
  demoUserTeamMates: User[]
}

export const TeamsContext = createContext<TeamsContextProps | null>(null)
