export type SignupTypes = {
  email: string
  firstName: string
  lastName: string
  password: string
}

export type HandleSignupTypes = {
  email: string
  nameSurname: string
  password: string
}

export type CreateUserTypes = {
  createUser: {
    email: string
    name: string
  }
}
