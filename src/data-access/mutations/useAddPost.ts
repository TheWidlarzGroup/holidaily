import { useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import { FeedPost } from 'mock-api/models/miragePostTypes'
import { queryClient } from 'dataAccess/queryClient'
import { QueryKeys } from 'dataAccess/QueryKeys'
import { API } from '../API'

type PostSuccess = {
  post: FeedPost
}

const addPost = async (body: FeedPost): Promise<PostSuccess> => {
  const { data } = await axios.post<PostSuccess>(API.POST.addPost, body)
  return data
}
export const useAddPost = () =>
  useMutation<PostSuccess, AxiosError<{ errors: string[] }>, FeedPost>(addPost, {
    onSuccess: (payload) => {
      queryClient.setQueryData<FeedPost[]>([QueryKeys.POSTS], (data) => {
        if (data?.length) return [payload.post, ...data]
        return [payload.post]
      })
    },
    onError: (err) => {
      console.log('Error while adding post: ', err.message)
    },
  })
