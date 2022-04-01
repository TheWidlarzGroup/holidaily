import { belongsTo, hasMany, Model } from 'miragejs'
import { FeedPost } from './miragePostTypes'
import { Organization, Team, DayOffRequest, User } from './mirageTypes'

export type Schema = {
  user: User[]
  organization: Organization
  request: DayOffRequest[]
  team: Team[]
  post: FeedPost[]
  notification: Notification[]
}

export const Models = {
  user: Model.extend({
    requests: hasMany(),
    notificationsCaused: hasMany('notification'),
  }),
  request: Model.extend({
    user: belongsTo(),
  }),
  notification: Model.extend({
    source: belongsTo('user'),
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
export * from './miragePostTypes'
