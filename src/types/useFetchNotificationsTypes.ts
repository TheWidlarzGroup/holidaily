import { UserData } from './holidaysDataTypes'

type CommonNotificationProps = {
  id: string
  isSeen: boolean
  type: 'like' | 'comment' | 'dayOff' | 'prompt'
  createdAt: string
  author: UserData
}

type DayOffNotificationProps = {
  type: 'dayOff'
  endDate: string
}

type HoliFeedNotificationProps = {
  type: 'like' | 'comment'
}

type SpecificNotificationProps = DayOffNotificationProps | HoliFeedNotificationProps
export type Notification = CommonNotificationProps & SpecificNotificationProps
