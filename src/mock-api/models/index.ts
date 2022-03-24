import { Model } from 'miragejs'
import { DayOffRequest } from './DayOffRequest'
import { Organization } from './Organization'
import { User } from './User'

export type Schema = {
  users: User[]
  organizations: Organization[]
  dayOffRequests: DayOffRequest[]
}

export const Models = {
  user: Model,
  dayOffRequest: Model,
  organization: Model,
}
export * from './User'
export * from './Organization'
export * from './Team'
export * from './DayOffRequest'
