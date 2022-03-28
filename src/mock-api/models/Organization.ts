import { User } from './User'

export type Team = {
  id: string
  name: string
  users: User[]
}

export type Organization = {
  id: string
  name: string
  // organization policies, e.g. maxPtoDays belong here
  maxPtoDays: number
  teams: Team[]
}
