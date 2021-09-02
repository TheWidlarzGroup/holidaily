import { useQuery } from 'react-query'
import { useState } from 'react'
import { usersQuery } from 'graphqlActions/queries/usersQuery'
import { FetchEmployeesQueryTypes } from 'types/useFetchEmployeesTypes'
import { UserTypes } from 'types/useUserTypes'

export const useFetchEmployees = () => {
  const [employees, setEmployees] = useState<UserTypes[]>([])
  const { isLoading, error } = useQuery('fetch-users', usersQuery, {
    onSuccess: (data: FetchEmployeesQueryTypes) => {
      setEmployees(data.users)
    },
  })

  return { employees, isLoading, error }
}
