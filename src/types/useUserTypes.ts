export type UserTypes = {
  confirmed: boolean | null
  firstName: string
  lastName: string
  email: string
  role: string
}
export type UserQueryTypes = {
  user: UserTypes
}
