export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  confirmed: boolean
  occupation: string
  teams: Team[]
  userColor: string
  language: 'pl' | 'en'
  photo: string | null
  role: string
  availablePto: number
  requests: DayOffRequest[]
  isOnHoliday: boolean
}

type Attachment = {
  id: string
  uri: string
  name?: string
}

export type DayOffRequest = {
  description: string
  id: string
  message: string
  startDate: string
  endDate: string
  isSickTime: boolean
  createdAt: string
  status: 'accepted' | 'cancelled' | 'pending' | 'past'
  prevScreen?: 'STATS_AND_REQUESTS' | 'NOTIFICATIONS'
  // array of attachments URLs
  attachments?: Attachment[]
}

export type Team = {
  id: string
  name: string
  users: User[]
}

export type Organization = {
  id: string
  name: string
  maxPtoDays: number
  teams: Team[]
}

export type Notification =
  | {
      id: string
      createdAt: string
      source: User
      wasSeenByHolder: boolean
      holderId: string
      requestId?: string
    } & (
      | { type: 'like' | 'comment' | 'prompt' }
      | { type: 'dayOff'; endDate: string }
      | { type: 'accepted' | 'cancelled'; description: string }
    )
