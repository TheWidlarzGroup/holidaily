import { belongsTo, hasMany, Model } from 'miragejs'
import { DayOffRequest } from './DayOffRequest'
import { Organization } from './Organization'
import { User } from './User'

export type Schema = {
  user: User[]
  organization: Organization[]
  dayOffRequest: DayOffRequest[]
  notification: Notification[]
}

export const Models = {
  user: Model.extend({
    dayOffRequest: hasMany(),
    notificationsCaused: hasMany('notification'),
  }),
  dayOffRequest: Model.extend({
    user: belongsTo(),
  }),
  notification: Model.extend({
    source: belongsTo('user'),
  }),
  organization: Model,
}
export * from './HttpError'
export * from './User'
export * from './Organization'
export * from './Team'
export * from './DayOffRequest'
