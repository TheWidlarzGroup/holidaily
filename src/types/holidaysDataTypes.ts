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
  users: (UserData & { holidays: HolidayDetails })[]
}

export type HolidayDetails = {
  id: number
  isOnHoliday: boolean
  dayStart?: string
  dayEnd?: string
}

export type RequiredMateHolidaysData = UserData & { holidays: Required<HolidayDetails> }
