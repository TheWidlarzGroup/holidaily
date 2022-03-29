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
  role: 'Admin'
  requests: DayOffRequest[]
}

export type DayOffRequest = {
  description: string
  id: string
  message: string
  startDate: string
  endDate: string
  isSickTime: boolean
  status: 'accepted' | 'cancelled' | 'pending' | 'past'
  isOnHoliday: boolean
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
