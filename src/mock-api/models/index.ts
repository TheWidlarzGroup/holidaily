import { belongsTo, hasMany, Model } from 'miragejs'
import { Organization } from './Organization'
import { Team, TeamUser, TeamUserRequest } from './Team'
import { User } from './User'

export type Schema = {
  users: User[]
  organization: Organization
  teams: Team[]
  teamUser: TeamUser[]
  TeamUserRequest: TeamUserRequest[]
}

export const Models = {
  user: Model,
  organization: Model.extend({
    teams: hasMany(),
  }),
  team: Model.extend({
    organization: belongsTo(),
    users: hasMany(),
  }),
  teamUser: Model.extend({
    user: belongsTo(),
    teamUserRequest: hasMany(),
  }),
  teamUserRequest: Model,
}
export * from './User'
export * from './Organization'
export * from './Team'
