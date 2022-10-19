import { User } from 'mockApi/models'

export type UserTypes = {
  confirmed: boolean
} & Omit<User, 'confirmed'>
