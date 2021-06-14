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
  photo?: string | null
}
export type HolidayDetails = {
  id: number
  isOnHoliday: boolean
  dayStart?: string
  dayEnd?: string
}
export type HolidayDetailsOptional = {
  sickLeave?: boolean
  descriptiom?: string
}

export type ValidationOfGroupDayOff = {
  groupId: number
  groupName: string
  users: MateHolidaysData[]
}
export type UserDetails = {
  isConfirmed: boolean
  id: string
  firstName: string
  lastName: string
  role?: string
  password?: string
  holidays?: {
    id: number
    isOnHoliday: boolean
    dayStart: string
    dayEnd: string
  }
  teams?: string[]
  photo?: string | null
}
export type MateHolidaysData = UserData & { holidays: HolidayDetails }
export type RequiredMateHolidaysData = UserData & { holidays: Required<HolidayDetails> }

export type MateHolidaysData = UserData & { holidays: HolidayDetails & HolidayDetailsOptional }
export type RequiredMateHolidaysData = UserData & {
  holidays: Required<HolidayDetails> & HolidayDetailsOptional
}
