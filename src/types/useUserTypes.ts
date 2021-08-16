export type UserTypes = {
  confirmed: boolean
  firstName: string
  lastName: string
  email: string
  occupation: string | null
  role: string
}
export type UserQueryTypes = {
  user: UserTypes
}
