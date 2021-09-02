import { UserData } from 'contexts/UserContext'

export type UpdateUserTypes = Pick<UserData, 'firstName' | 'lastName' | 'occupation'>

type UpdateUserPayload = Pick<UserData, 'firstName' | 'lastName' | 'occupation' | 'id'>

export type UpdateUserDataTypes = {
  updateUser: UpdateUserPayload
}
// TODO: add color when BE ready
