import { createContext } from 'react'
import { Team, User } from 'mock-api/models/mirageTypes'

type AddUserToTeamsOptions = { withReset?: true }

export type TeamsContextProps = {
  teams: Team[]
  allUsers: User[]
  usersWithoutPastReq: User[]
  addUserToTeams: (u: User, t: string[], o?: AddUserToTeamsOptions) => void
  reset: F0
}

export const TeamsContext = createContext<TeamsContextProps | null>(null)
