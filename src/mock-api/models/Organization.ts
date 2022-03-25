import { Team } from './Team'

export type Organization = {
  id: string
  name: string
  maxPtoDays: number
  teams: Team[]
}
