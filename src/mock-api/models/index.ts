import { belongsTo, hasMany, Model } from 'miragejs'
import { Organization, Team, DayOffRequest, User } from './mirageTypes'

export type Schema = {
  user: User[]
  organization: Organization
  request: DayOffRequest[]
  team: Team[]
}

export const Models = {
  user: Model.extend({
    requests: hasMany(),
  }),
  request: Model.extend({
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
export * from './HttpError'
export * from './mirageTypes'
