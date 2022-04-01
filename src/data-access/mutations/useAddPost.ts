import { useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import { FeedPost } from 'mock-api/models/miragePostTypes'
import { queryClient } from 'dataAccess/queryClient'
import { QueryKeys } from 'dataAccess/QueryKeys'
import { API } from '../API'

type Post = {
  post: FeedPost
}

const addPost = async (body: FeedPost): Promise<Post> => {
  const { data } = await axios.post<Post>(API.POST.addPost, body)
  return data
}
export const useAddPost = () =>
  useMutation<Post, AxiosError<{ errors: string[] }>, FeedPost>(addPost, {
    onSuccess: (payload) => {
      queryClient.setQueryData<FeedPost[]>([QueryKeys.POSTS], (data) => [payload.post, ...data])
    },
    onError: (err) => {
      console.log('Error while adding post: ', err.message)
    },
  })
