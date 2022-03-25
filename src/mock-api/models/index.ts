import { belongsTo, hasMany, Model } from 'miragejs'
import { DayOffRequest } from './DayOffRequest'
import { Organization } from './Organization'
import { User } from './User'

export type Schema = {
  user: User[]
  organization: Organization[]
  dayOffRequest: DayOffRequest[]
}

export const Models = {
  user: Model.extend({
    dayOffRequest: hasMany(),
  }),
  dayOffRequest: Model.extend({
    user: belongsTo(),
  }),
  organization: Model,
}
export * from './User'
export * from './Organization'
export * from './Team'
export * from './DayOffRequest'
