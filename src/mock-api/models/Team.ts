import { User } from './User'

export type Team = {
  id: string
  name: string
  users: TeamUser[]
}

export type TeamUser = {
  id: Pick<User, 'id'>
  name: Pick<User, 'firstName'>
  requests: TeamUserRequest[]
}

export type TeamUserRequest = {
  id: string
  status: 'CANCELLED' | 'APPROVED' | 'PENDING' | 'PAST'
  startDate: string
  endDate: string
  count: number
  createdAt: string
}
