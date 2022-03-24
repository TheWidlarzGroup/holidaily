import { User } from './User'

export type DayOffRequest = {
  description: string
  id: string
  message: string
  range: Date[]
  sickTime: boolean
  status: 'ACCEPTED' | 'CANCELLED' | 'PENDING' | 'REJECTED'
  user: User
}
