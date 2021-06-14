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

export type HolidayDetails = {
  id: number
  isOnHoliday: boolean
  dayStart?: string
  dayEnd?: string
}
export type ValidationOfGroupDayOff = {
  groupId: number
  groupName: string
  users: Omit<UserDetails, 'isConfirmed'>[]
}

export type UserDetails = {
  isConfirmed: boolean
  id: string
  firstName: string
  lastName: string
  role: string
  password?: string
  holidays?: {
    id: number
    isOnHoliday: boolean
    dayStart: string
    dayEnd: string
  }
  teams?: string[]
}
export type MateHolidaysData = UserData & { holidays: HolidayDetails }
export type RequiredMateHolidaysData = UserData & { holidays: Required<HolidayDetails> }
