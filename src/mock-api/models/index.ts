import { belongsTo, hasMany, Model } from 'miragejs'
import { FeedPost } from './miragePostTypes'
import { Organization, Team, DayOffRequest, User } from './mirageTypes'

export type Schema = {
  user: User[]
  organization: Organization
  request: DayOffRequest[]
  team: Team[]
  post: FeedPost[]
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
  post: Model,
}
export * from './HttpError'
export * from './mirageTypes'
