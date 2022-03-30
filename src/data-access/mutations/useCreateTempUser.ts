import { useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import { User } from 'mock-api/models'
import { API } from '../API'
import { queryClient } from '../queryClient'
import { QueryKeys } from '../QueryKeys'

type PostTempUserBody = Pick<User, 'firstName'> & Partial<User>

const postUser = async (body: PostTempUserBody): Promise<User> => {
  const { data } = await axios.post<User>(API.POST.createTempUser, body)
  return data
}
export const useCreateTempUser = () =>
  useMutation<User, AxiosError<{ errors: string[] }>, PostTempUserBody>(postUser, {
    onSuccess: (payload) => {
      queryClient.setQueryData([QueryKeys.USER], () => ({ ...payload }))
      axios.defaults.headers.common.userId = payload.id
    },
    onError: (err) => {
      console.log('Error while posting user: ', err.message)
    },
  })
