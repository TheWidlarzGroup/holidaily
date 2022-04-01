import { createContext } from 'react'
import { Team } from 'mock-api/models/mirageTypes'

export type ContextProps = {
  teams: Team[] | null
  updateTeams: (newData: Team[]) => void
}

export const TeamsContext = createContext<ContextProps | null>(null)
