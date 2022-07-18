import { User } from 'mock-api/models/mirageTypes'

export type UserTypes = {
  confirmed: boolean
} & Omit<User, 'confirmed'>
