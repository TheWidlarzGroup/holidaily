import { User } from './User'

export type DayOffRequest = {
  description: string
  id: string
  message: string
  startDate: Date
  endDate: Date
  isSickTime: boolean
  status: 'accepted' | 'cancelled' | 'pending' | 'past'
  user: User
}
