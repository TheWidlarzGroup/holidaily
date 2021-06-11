export type ValidationOfCompanyDayOff = {
  id: number
  isOnHoliday: boolean
  dayStart: string
  dayEnd: string
  user: UserData
}

export type UserData = {
  id: string
  firstName: string
  lastName: string
}

export type ValidationOfGroupDayOff = {
  groupId: number
  groupName: string
  users: UserDetails[]
}

export type UserDetails = {
  id: string
  firstName: string
  lastName: string
  role: string
  password: string
  holidays?: {
    id: number
    isOnHoliday: boolean
    dayStart: string
    dayEnd: string
  }
  teams?: string[]
}
