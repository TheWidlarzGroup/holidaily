import { User } from './User'

export type Notification = {
  id: string
  createdAt: string
  source: User
  wasSeenByHolder: boolean
  holderId: string
} & (
  | {
      type: 'like' | 'comment'
    }
  | { type: 'dayOff'; endDate: string }
)
