import { useQuery } from 'react-query'

import { userQuery } from 'legacy/graphql/queries/userQuery'
import { UserQueryTypes } from 'types/useUserTypes'
import { useBooleanState } from 'hooks/useBooleanState'
import { useUserContext } from 'hooks/useUserContext'

export const useUserData = () => {
  const [isEnabled, { setTrue: fetchUser }] = useBooleanState(false)
  const { updateUser } = useUserContext()
  const { isLoading, error } = useQuery('fetch-user', userQuery, {
    onSuccess: (data: UserQueryTypes) => {
      updateUser(data.user)
    },
    enabled: isEnabled,
  })

  return { isLoading, error, fetchUser }
}
