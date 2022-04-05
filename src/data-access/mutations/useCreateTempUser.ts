import { useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import { User } from 'mock-api/models'
import { API } from '../API'
import { queryClient } from '../queryClient'
import { QueryKeys } from '../QueryKeys'

export type PostTempUserBody = Pick<User, 'firstName'> & Partial<User>
export type PostTempUserSuccess = { user: User }

const postUser = async (body: PostTempUserBody): Promise<PostTempUserSuccess> => {
  const { data } = await axios.post<PostTempUserSuccess>(API.POST.createTempUser, body)
  return data
}
export const useCreateTempUser = () =>
  useMutation<PostTempUserSuccess, AxiosError<{ errors: string[] }>, PostTempUserBody>(postUser, {
    onSuccess: (payload) => {
      queryClient.setQueryData([QueryKeys.USER], () => ({ ...payload }))
      axios.defaults.headers.common.userId = payload.user.id
    },
    onError: (err) => {
      console.error('Error while posting user: ', err.message)
      if (err.isAxiosError) console.error(err.response?.data)
    },
  })
