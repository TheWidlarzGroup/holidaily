import { UserData } from './holidaysDataTypes'

// DANGER this type is just for UI development, in future it should match the backend model of Notification
export type Notification = {
  id: string
  isSeen: boolean
  type: 'like' | 'comment' | 'dayOff'
  createdAt: string
  author: UserData
} & (
  | {
      type: 'like' | 'comment'
    }
  | {
      type: 'dayOff'
      endDate: string
    }
)
