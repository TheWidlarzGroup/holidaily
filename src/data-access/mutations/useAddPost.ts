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

const editPost = async (post: FeedPost): Promise<PostSuccess> => {
  const { data } = await axios.put<PostSuccess>(API.PUT.editPost(post), post)
  return data
}
export const useEditPost = () =>
  useMutation<PostSuccess, AxiosError<{ errors: string[] }>, FeedPost>(editPost, {
    onSuccess: (payload) => {
      queryClient.setQueryData<FeedPost[]>([QueryKeys.POSTS], (data) => {
        if (!data) throw new Error('No posts found!')
        const allPosts = data
        const editedPostId = payload.post.id
        const postIndex = allPosts?.findIndex((post) => post.id === editedPostId)
        allPosts[postIndex] = payload.post
        return allPosts
      })
    },
    onError: (err) => {
      console.log('Error while adding post: ', err.message)
    },
  })

const deletePost = async (id: string): Promise<string> => {
  const { data } = await axios.delete(API.DELETE.deletePost(id), { data: id })
  return data
}
export const useDeletePost = () =>
  useMutation<string, AxiosError<{ errors: string[] }>, string>(deletePost, {
    onSuccess: (payload) => {
      queryClient.setQueryData<FeedPost[]>([QueryKeys.POSTS], (data) => {
        if (!data) throw new Error('No posts found!')
        const filteredPosts = data.filter((post) => post.id !== payload)
        return filteredPosts
      })
    },
    onError: (err) => {
      console.log('Error while removing post: ', err.message)
    },
  })
