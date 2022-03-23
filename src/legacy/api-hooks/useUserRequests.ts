import { useQuery } from 'react-query'
import { useState } from 'react'
import { userRequestsQuery } from 'legacy/graphql/queries/userRequestsQuery'
import { RequestsQueryTypes, RequestTypes } from 'types/useUserRequestsTypes'

export const useUserRequests = () => {
  const [requests, setRequests] = useState<RequestTypes[]>([])
  const { isLoading, error } = useQuery('fetch-user-requests', userRequestsQuery, {
    onSuccess: (data: RequestsQueryTypes) => {
      setRequests(data.requests)
    },
  })

  return { requests, isLoading, error }
}
