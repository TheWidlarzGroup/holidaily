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

export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  confirmed: boolean
  occupation: string
  organization: any
  userColor: string
  language: 'pl' | 'en'
  photo: string | null
  role: 'Admin'
  requests: DayOffRequest[]
}
