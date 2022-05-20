import { useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import { Team, User } from 'mock-api/models'
import { useUserContext } from 'hooks/useUserContext'
import { removeItem, setItem, StorageKeys } from 'utils/localStorage'
import { API } from '../API'
import { queryClient } from '../queryClient'
import { QueryKeys } from '../QueryKeys'

export type EditUserBody = Partial<User>
export type EditUserSuccess<T = null> = T extends 'OptionalTeams'
  ? { user: Omit<User, 'teams'> & { teams?: Team[] } }
  : { user: User }

const editUser = async (body: EditUserBody): Promise<EditUserSuccess> => {
  const { data } = await axios.put<EditUserSuccess>(API.PUT.editUser, body)
  return data
}

const fieldsToStoreLocally: readonly (keyof User & StorageKeys)[] = [
  'firstName',
  'lastName',
  'occupation',
  'photo',
  'userColor',
]

export const useEditUser = () => {
  const { updateUser } = useUserContext()
  return useMutation<EditUserSuccess, AxiosError<{ errors: string[] }>, EditUserBody>(editUser, {
    onSuccess: (payload: EditUserSuccess<'OptionalTeams'>) => {
      queryClient.setQueryData([QueryKeys.USER], () => ({ ...payload }))
      const { user } = payload
      // user on the backend has teams as an empty array so we want to delete them before updating the context
      delete user.teams
      updateUser(user)
      Promise.all(
        fieldsToStoreLocally.map((field) =>
          user[field] ? setItem(field, String(user[field])) : removeItem(field)
        )
      )
    },
    onError: (err) => {
      console.log('Error while updating user: ', err.message)
    },
  })
}
