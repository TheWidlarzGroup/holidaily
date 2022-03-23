import { Model } from 'miragejs'
import { User } from './User'

export type Schema = {
  users: User[]
}

export const Models = {
  movie: Model,
  user: Model,
  organization: Model,
}
export * from './User'
export * from './Organization'
export * from './Team'
