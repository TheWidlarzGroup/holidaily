import { belongsTo, hasMany, Model } from 'miragejs'
import { Comment, FeedPost, Reaction } from './miragePostTypes'
import { Organization, Team, DayOffRequest, User, Notification } from './mirageTypes'

export type Schema = {
  user: User[]
  organization: Organization
  request: DayOffRequest[]
  team: Team[]
  post: FeedPost[]
  notification: Notification[]
  comment: Comment[]
  reaction: Reaction[]
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
  post: Model.extend({
    comments: hasMany(),
    reactions: hasMany(),
  }),
  comment: Model.extend({
    post: belongsTo(),
  }),
  reaction: Model.extend({
    post: belongsTo(),
  }),
}

export * from './HttpError'
export * from './mirageTypes'
export * from './miragePostTypes'
