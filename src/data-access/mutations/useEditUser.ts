import { useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import { User } from 'mock-api/models'
import { API } from '../API'
import { queryClient } from '../queryClient'
import { QueryKeys } from '../QueryKeys'

export type EditUserBody = Partial<User>
export type EditUserSuccess = { user: User }

const editUser = async (body: EditUserBody): Promise<EditUserSuccess> => {
  const { data } = await axios.put<EditUserSuccess>(API.PUT.editUser, body)
  return data
}
export const useEditUser = () =>
  useMutation<EditUserSuccess, AxiosError<{ errors: string[] }>, EditUserBody>(editUser, {
    onSuccess: (payload) => {
      queryClient.setQueryData([QueryKeys.USER], () => ({ ...payload }))
    },
    onError: (err) => {
      console.log('Error while updating user: ', err.message)
    },
  })
