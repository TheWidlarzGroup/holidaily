import { useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import {
  AddComment,
  AddReaction,
  EditComment,
  FeedPost,
  Reaction,
} from 'mock-api/models/miragePostTypes'
import { queryClient } from 'dataAccess/queryClient'
import { QueryKeys } from 'dataAccess/QueryKeys'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
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

const deleteComment = async (comment: string): Promise<SubmitSuccess> => {
  const { data } = await axios.delete(API.DELETE.deleteComment(comment), { data: comment })
  return data
}
export const useDeleteComment = () =>
  useMutation<SubmitSuccess, AxiosError<{ errors: string[] }>, string>(deleteComment, {
    onSuccess: (payload) => {
      queryClient.setQueryData<FeedPost[]>([QueryKeys.POSTS], (data) => {
        if (!data) throw new Error('No posts found!')
        const allPosts = data
        const deletedCommentPostId = payload.post.id
        const postIndex = allPosts?.findIndex((post) => post.id === deletedCommentPostId)
        allPosts[postIndex] = payload.post
        return allPosts
      })
    },
    onError: (err) => {
      console.log('Error while removing comment: ', err.message)
    },
  })

const editComment = async (comment: EditComment): Promise<SubmitSuccess> => {
  const { data } = await axios.put(API.PUT.editComment(comment), comment)
  return data
}
export const useEditComment = () =>
  useMutation<SubmitSuccess, AxiosError<{ errors: string[] }>, EditComment>(editComment, {
    onSuccess: (payload) => {
      queryClient.setQueryData<FeedPost[]>([QueryKeys.POSTS], (data) => {
        if (!data) throw new Error('No posts found!')
        const allPosts = data
        const editedCommentPostId = payload.post.id
        const postIndex = allPosts?.findIndex((post) => post.id === editedCommentPostId)
        allPosts[postIndex] = payload.post
        return allPosts
      })
    },
    onError: (err) => {
      console.log('Error while editing comment: ', err.message)
    },
  })

const addReaction = async (reaction: AddReaction): Promise<SubmitSuccess> => {
  const { data } = await axios.put(API.PUT.addReactionToPost(reaction), reaction)
  return data
}
export const useAddReaction = () => {
  const { user } = useUserContext()
  return useMutation<SubmitSuccess, AxiosError<{ errors: string[] }>, AddReaction>(addReaction, {
    onMutate: async ({ reaction, postId }) => {
      await queryClient.cancelQueries([QueryKeys.POSTS])
      const allPosts: FeedPost[] = queryClient.getQueryData([QueryKeys.POSTS]) || []
      const postIndex = allPosts?.findIndex((post) => post.id === postId)
      const reactionToUpdate = allPosts[postIndex].reactions.filter(
        (oldReaction) => oldReaction.type === reaction.type
      )
      console.log('AA', reactionToUpdate)
      const typesOfReactionsInPost = allPosts[postIndex].reactions.map((reaction) => reaction.type)
      const allPostReactions = allPosts[postIndex].reactions
      let updatedReactions: Reaction[]
      if (reactionToUpdate[0]?.users.includes(user?.id || '')) {
        console.log('juz jest')
        updatedReactions = allPostReactions.map((oldReaction) => {
          if (oldReaction.users.includes(user?.id || '')) {
            const reactionUsers = oldReaction.users.filter((id) => id !== user?.id)
            return { ...oldReaction, users: reactionUsers }
          }
          return oldReaction
        })
        updatedReactions = updatedReactions.filter((reaction) => reaction.users.length > 0)
      } else {
        console.log('nie ma')
        updatedReactions = allPostReactions.map((oldReaction) => {
          if (oldReaction.type === reaction.type)
            return { ...oldReaction, users: [...oldReaction.users, user?.id || ''] }
          return oldReaction
        })
        if (!typesOfReactionsInPost.includes(reaction.type))
          updatedReactions = [...updatedReactions, reaction]
      }
      const updatedPost: FeedPost = {
        ...allPosts[postIndex],
        reactions: updatedReactions,
      }
      console.log('onMutate', updatedReactions)
      allPosts[postIndex] = updatedPost
      queryClient.setQueryData([QueryKeys.POSTS], allPosts)
    },
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
        console.log('onSucesss', allPosts[postIndex].reactions)

        if (allPosts?.length) return [...allPosts]
        return [payload.post]
      })
    },
    onError: (err) => {
      console.log('Error while adding reaction: ', err.message)
    },
    onSettled: () => {
      queryClient.invalidateQueries([QueryKeys.POSTS])
    },
  })
}
