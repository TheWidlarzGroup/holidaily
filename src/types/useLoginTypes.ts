export type LoginTypes = {
  email: string
  password: string
}

export type UserTypes = {
  loginUser: {
    token: string
    user: {
      confirmed: boolean | null
      firstName: string
      lastName: string
      email: string
    }
  }
}

export type ErrorTypes = {
  message: string
}
