export type ChangeRoleTypes = {
  role: string
  userId: string
}

export type ChangeRoleDataTypes = {
  user: {
    confirmed: boolean
    email: string
    firstName: string
    lastName: string
    id: string
    occupation: string
    role: string
  }
}
