import { UserTypes } from './useUserTypes'

export type ChangeRoleTypes = {
  userId: string
} & UserTypes

export type ChangeRoleDataTypes = {
  user: UserTypes
}
