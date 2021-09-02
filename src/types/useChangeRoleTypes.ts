import { UserTypes } from './useUserTypes'

export type ChangeRoleTypes = {
  userId: string
} & Pick<UserTypes, 'role'>

export type ChangeRoleDataTypes = {
  user: UserTypes
}
