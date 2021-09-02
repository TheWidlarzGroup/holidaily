import { UserData } from 'contexts/UserContext'

export type UserTypes = {
  confirmed: boolean
} & Omit<UserData, 'isConfirmed'>

export type UserQueryTypes = {
  user: UserTypes
}
