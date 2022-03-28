import { belongsTo, hasMany, Model } from 'miragejs'
import { Organization, Team } from './Organization'
import { DayOffRequest, User } from './User'

export type Schema = {
  user: User[]
  organization: Organization
  dayOffRequest: DayOffRequest[]
  team: Team[]
}

export const Models = {
  user: Model.extend({
    dayOffRequest: hasMany(),
  }),
  dayOffRequest: Model.extend({
    user: belongsTo(),
  }),
  organization: Model.extend({
    teams: hasMany(),
  }),
  team: Model.extend({
    organization: belongsTo(),
    users: hasMany(),
  }),
}
export * from './User'
export * from './Organization'
