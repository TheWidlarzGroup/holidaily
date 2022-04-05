import { useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import { AddComment, AddReaction, FeedPost } from 'mock-api/models/miragePostTypes'
import { queryClient } from 'dataAccess/queryClient'
import { QueryKeys } from 'dataAccess/QueryKeys'
import { API } from '../API'

type SubmitSuccess = {
  post: FeedPost
}

const addComment = async (comment: AddComment): Promise<SubmitSuccess> => {
  const { data } = await axios.post(API.POST.addCommentToPost(comment), comment)
  return data
}
export const useAddComment = () =>
  useMutation<SubmitSuccess, AxiosError<{ errors: string[] }>, AddComment>(addComment, {
    onSuccess: (payload) => {
      queryClient.setQueryData<FeedPost[]>([QueryKeys.POSTS], (data) => {
        if (!data) throw new Error('No posts found!')
        const allPosts = data
        const postIndex = allPosts?.findIndex((post) => post.id === payload.post.id)
        if (postIndex !== -1 && allPosts) {
          allPosts[postIndex] = payload.post
        }
        if (allPosts?.length) return [...allPosts]
        return [payload.post]
      })
    },
    onError: (err) => {
      console.log('Error while adding comment: ', err.message)
    },
  })

const addReaction = async (reaction: AddReaction): Promise<SubmitSuccess> => {
  const { data } = await axios.put(API.PUT.addReactionToPost(reaction), reaction)
  return data
}
export const useAddReaction = () =>
  useMutation<SubmitSuccess, AxiosError<{ errors: string[] }>, AddReaction>(addReaction, {
    onSuccess: (payload) => {
      queryClient.setQueryData<FeedPost[]>([QueryKeys.POSTS], (data) => {
        if (!data) throw new Error('No posts found!')
        const allPosts = data
        const postIndex = allPosts?.findIndex((post) => post.id === payload.post.id)
        if (postIndex !== -1 && allPosts) {
          allPosts[postIndex] = payload.post
        }
        if (allPosts?.length) return [...allPosts]
        return [payload.post]
      })
    },
    onError: (err) => {
      console.log('Error while adding reaction: ', err.message)
    },
  })
