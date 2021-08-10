import { useQuery } from 'react-query'

import { userQuery } from 'graphqlActions/queries/userQuery'
import { useEffect, useState } from 'react'
import { UserQueryTypes, UserTypes } from 'types/useUserTypes'
import { getItemAsync } from 'expo-secure-store'

export const useUserData = () => {
  const [token, setToken] = useState('')
  const [user, setUser] = useState<Partial<UserTypes>>({ confirmed: false })
  const { isLoading, error } = useQuery('fetch-user', userQuery, {
    onSuccess: (data: UserQueryTypes) => {
      setUser(data.user)
    },
    enabled: token.length > 0,
  })

  useEffect(() => {
    const func = async () => {
      const token = await getItemAsync('token')
      if (token !== null) {
        setToken(token)
      }
    }
    func()
  }, [token])

  return { user, isLoading, error, setToken }
}
