export type LoginTypes = {
  email: string
  password: string
}

export type UserTypes = {
  loginUser: {
    token: string
    user: {
      confirmed: boolean | null
    }
  }
}

export type ErrorTypes = {
  isError: boolean
  message: string
}
