import { User } from 'mock-api/models/mirageTypes'

export type UpdateUserTypes = Pick<User, 'firstName' | 'lastName' | 'occupation'>

type UpdateUserPayload = Pick<User, 'firstName' | 'lastName' | 'occupation' | 'id'>

export type UpdateUserDataTypes = {
  updateUser: UpdateUserPayload
}
// TODO: add color when BE ready
