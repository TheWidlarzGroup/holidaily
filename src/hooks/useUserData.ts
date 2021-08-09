import { useQuery } from 'react-query'

import { userQuery } from 'graphqlActions/queries/userQuery'
import { useState } from 'react'
import { UserQueryTypes, UserTypes } from 'types/useUserTypes'
import { emptyUser } from 'contexts/UserProvider'

export const useUserData = () => {
  const [user, setUser] = useState<UserTypes>({ ...emptyUser, confirmed: false })
  const { isLoading, error } = useQuery('fetch-user', userQuery, {
    onSuccess: (data: UserQueryTypes) => {
      setUser(data.user)
    },
  })
  return { user, isLoading, error }
}
