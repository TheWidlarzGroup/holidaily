import { User } from 'mockApi/models'

export const userDetails = (user: User | null) =>
  user
    ? {
        userColor: user.userColor,
        lastName: user.lastName,
        firstName: user.firstName,
      }
    : undefined
