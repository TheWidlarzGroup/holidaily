import { useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import { AddComment, AddReaction, EditComment, FeedPost } from 'mock-api/models/miragePostTypes'
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
          const filtered = payload.post.reactions.filter((reaction) => reaction.users.length > 0)

          payload.post.reactions = filtered

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

const deleteComment = async (comment: EditComment): Promise<any> => {
  console.log('commment', comment)
  await axios
    .delete(API.DELETE.deleteComment({ data: comment }))
    .then((data) => console.log('dadata', data))
    .catch((err) => console.log(err))
  return {}
}
export const useDeleteComment = () =>
  useMutation<any, AxiosError<{ errors: string[] }>, any>(deleteComment, {
    onSuccess: (payload) => {
      queryClient.setQueryData<FeedPost[]>([QueryKeys.POSTS], (data) => {
        if (!data) throw new Error('No posts found!')
        console.log(payload)
        return data
      })
    },
    onError: (err) => {
      console.log('Error while removing comment: ', err.message)
    },
  })

const editComment = async (comment: EditComment): Promise<any> => {
  const { data } = await axios.put(API.PUT.editComment(comment))
  return data
}
export const useEditComment = () =>
  useMutation<any, AxiosError<{ errors: string[] }>, any>(editComment, {
    onSuccess: (payload) => {
      queryClient.setQueryData<FeedPost[]>([QueryKeys.POSTS], (data) => {
        if (!data) throw new Error('No posts found!')
        console.log('payload', payload)
        return data
      })
    },
    onError: (err) => {
      console.log('Error while editing comment: ', err.message)
    },
  })
