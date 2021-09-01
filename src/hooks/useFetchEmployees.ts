import { useQuery } from 'react-query'
import { useState } from 'react'
import { usersQuery } from 'graphqlActions/queries/usersQuery'
import { FetchEmployeesQueryTypes, EmployeeTypes } from 'types/useFetchEmployeesTypes'

export const useFetchEmployees = () => {
  const [employees, setEmployees] = useState<EmployeeTypes[]>([])
  const { isLoading, error } = useQuery('fetch-users', usersQuery, {
    onSuccess: (data: FetchEmployeesQueryTypes) => {
      setEmployees(data.users)
    },
  })

  return { employees, isLoading, error }
}
