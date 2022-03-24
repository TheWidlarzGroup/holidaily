import { Team } from './Team'

export type Organization = {
  id: string
  name: string
  // organization policies, e.g. maxPtoDays belong here
  maxPtoDays: number
  teams: Team[]
}
