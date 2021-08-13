import { Dispatch, SetStateAction } from 'react'
import { TeamsType } from 'utils/mocks/teamsMocks'

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
  occupation?: string
}
export type HolidayDetails = {
  id: number
  isOnHoliday: boolean
  dayStart?: string
  dayEnd?: string
}
export type HolidayDetailsOptional = {
  sickLeave?: boolean
  description?: string
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
  occupation?: string
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

export type MateHolidaysData = UserData & { holidays: HolidayDetails & HolidayDetailsOptional }
export type RequiredMateHolidaysData = UserData & {
  holidays: Required<HolidayDetails> & HolidayDetailsOptional
}

export type GalleryItemData = {
  src: string
  type: 'image' | 'video'
}

export type AttachmentType = {
  id: string
  uri: string
}

export type UserTeamsSubscriptions = {
  userTeams: TeamsType[]
  setUserTeams: Dispatch<SetStateAction<TeamsType[]>>
}
