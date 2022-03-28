import { User } from './User'

export type Team = {
  id: string
  name: string
  teamUsers: TeamUser[]
}

export type TeamUser = {
  id: Pick<User, 'id'>
  name: Pick<User, 'firstName'>
  requests: TeamUserRequest[]
}

export type TeamUserRequest = {
  id: string
  status: 'CANCELLED' | 'APPROVED' | 'PENDING' | 'PAST'
  startDate: string // '06/05/2020',
  endDate: string // '10/05/2000',
  count: number // integer -> sobota/niedziela/swieto sie nie liczy
  createdAt: string
}
