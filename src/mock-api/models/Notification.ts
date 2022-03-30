import { User } from './User'

export type Notification = {
  id: string
  createdAt: string
  source: User
  wasSeenByHolder: boolean
  // better name would be holder instead of user, but there's less overhead in mirage if we name relationship props the same as models
  user: User
} & (
  | {
      type: 'like' | 'comment'
    }
  | { type: 'dayOff'; endDate: string }
)
