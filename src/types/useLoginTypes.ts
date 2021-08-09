import { UserTypes } from './useUserTypes'

export type LoginTypes = {
  email: string
  password: string
}

export type LoginUserTypes = {
  loginUser: {
    token: string
    user: UserTypes
  }
}

export type ErrorTypes = {
  message: string
}
