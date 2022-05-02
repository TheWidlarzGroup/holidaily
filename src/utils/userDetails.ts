import { User } from 'mockApi/models'

export const makeUserDetails = (user: User | null) =>
  user
    ? {
        userColor: user.userColor,
        lastName: user.lastName,
        firstName: user.firstName,
      }
    : undefined
