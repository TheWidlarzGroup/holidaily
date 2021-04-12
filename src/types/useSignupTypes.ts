export type SignupTypes = {
  email: string
  firstName: string
  lastName: string
  password: string
  passwordConfirmation: string
}

export type CreateUserTypes = {
  createUser: {
    user: {
      email: string
    }
  }
}
