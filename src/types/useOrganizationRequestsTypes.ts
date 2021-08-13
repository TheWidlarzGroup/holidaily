export type OrganizationRequestTypes = {
  description: string
  id: string
  sickTime: boolean
  status: string
  range: string[]
  user: {
    firstName: string
    lastName: string
  }
}
export type OrganizationRequestsTypes = {
  organizationRequests: OrganizationRequestTypes[]
}

export type FILTER = 'ALL' | 'ACCEPTED' | 'CANCELLED' | 'PENDING' | 'REJECTED'
