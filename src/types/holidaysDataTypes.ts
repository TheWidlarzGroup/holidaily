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

export type UserDetails = UserData & {
  holidays: {
    id?: number
    isOnHoliday?: boolean
    dayStart?: string
    dayEnd?: string
  }
}

export type RequiredUserDetails = UserData & {
  holidays: {
    id: number
    isOnHoliday: boolean
    dayStart: string
    dayEnd: string
  }
}
