import { belongsTo, hasMany, Model } from 'miragejs'
import { DayOffRequest } from './DayOffRequest'
import { Organization } from './Organization'
import { Team, TeamUser, TeamUserRequest } from './Team'
import { User } from './User'

export type Schema = {
  user: User[]
  organization: Organization
  dayOffRequest: DayOffRequest[]
  team: Team[]
  teamUser: TeamUser[]
  TeamUserRequest: TeamUserRequest[]
}

export const Models = {
  user: Model.extend({
    dayOffRequest: hasMany(),
    // teamUser: belongsTo(),
  }),
  dayOffRequest: Model.extend({
    user: belongsTo(),
  }),
  organization: Model.extend({
    teams: hasMany(),
  }),
  team: Model.extend({
    organization: belongsTo(),
    teamUsers: hasMany(),
  }),
  teamUser: Model.extend({
    requests: hasMany(),
    // team: belongsTo(),
    name: belongsTo('user'),
    // user: belongsTo(),
    // id: belongsTo('user'),
  }),
  request: Model.extend({
    teamUser: belongsTo(),
  }),
}
export * from './User'
export * from './Organization'
export * from './Team'
export * from './DayOffRequest'
