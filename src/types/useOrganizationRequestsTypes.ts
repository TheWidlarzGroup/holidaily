import { UserTypes } from './useUserTypes'

export type OrganizationRequestTypes = {
  description: string
  message: string
  id: string
  sickTime: boolean
  status: string
  range: string[]
} & RequestUserTypes

type RequestUserTypes = { user: Pick<UserTypes, 'firstName' | 'lastName' | 'occupation' | 'email'> }

export type OrganizationRequestsTypes = {
  organizationRequests: OrganizationRequestTypes[]
}

export type FILTER = 'ALL' | 'ACCEPTED' | 'CANCELLED' | 'PENDING' | 'REJECTED'
