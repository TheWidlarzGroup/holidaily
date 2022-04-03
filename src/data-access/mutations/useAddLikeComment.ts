import { useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import { AddComment, FeedPost } from 'mock-api/models/miragePostTypes'
import { queryClient } from 'dataAccess/queryClient'
import { QueryKeys } from 'dataAccess/QueryKeys'
import { API } from '../API'

type PostSuccess = {
  post: FeedPost
}

const addComment = async (comment: AddComment): Promise<PostSuccess> => {
  const { data } = await axios.post(API.POST.addCommentToPost(comment), comment)
  return data
}
export const useAddComment = () =>
  useMutation<PostSuccess, AxiosError<{ errors: string[] }>, AddComment>(addComment, {
    onSuccess: (payload) => {
      console.log('MUTATION PAYLOAD:', payload)
      queryClient.setQueryData<FeedPost[]>([QueryKeys.POSTS], (data) => {
        if (data?.length) return [payload.post, ...data]
        return [payload.post]
      })
    },
    onError: (err) => {
      console.log('Error while adding post: ', err.message)
    },
  })
