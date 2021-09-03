import { useQuery } from 'react-query'

import { useState } from 'react'
import {
  FILTER,
  OrganizationRequestsTypes,
  OrganizationRequestTypes,
} from 'types/useOrganizationRequestsTypes'
import { organizationRequestsQuery } from 'graphqlActions/queries/organizationRequestsQuery'

export const useOrganizationRequests = () => {
  const [requests, setRequests] = useState<OrganizationRequestTypes[]>()
  const [filter, setFilter] = useState<FILTER>('ALL')
  const { isLoading, error, refetch } = useQuery(
    ['fetch-organization-requests', filter],
    () => organizationRequestsQuery(filter),
    {
      onSuccess: (data: OrganizationRequestsTypes) => {
        setRequests(data.organizationRequests)
      },
    }
  )

  return { isLoading, error, requests, setFilter, refetch }
}
