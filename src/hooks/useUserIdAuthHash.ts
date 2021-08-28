import { useMutation, useQuery } from 'react-query'

import { userIdAuthHash } from 'graphqlActions/queries/userIdAuthHash'

export const useUserIdAuthHash = () => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery(
    'fetch-auth-hash',
    userIdAuthHash,
    {
      refetchInterval: Infinity,
      staleTime: Infinity,
    }
  )

  return { data, mutate: refetch, error, isError, isLoading, isSuccess }
}
