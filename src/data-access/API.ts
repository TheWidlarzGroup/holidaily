import { AddComment, AddReaction } from 'mockApi/models/miragePostTypes'

export const API = {
  GET: {
    allUsers: '/api/users',
    user: (id: string) => `api/users/${id}`,
    getOrganization: '/api/organization',
    getPosts: '/api/posts',
    userRequests: '/api/requests',
  },

  POST: {
    createTempUser: '/api/users',
    addPost: '/api/addpost',
    addCommentToPost: (comment: AddComment) => `/api/posts/${comment.postId}`,
  },
  PUT: {
    addReactionToPost: (reaction: AddReaction) => `/api/posts/${reaction.postId}`,
  },
  DELETE: {
    deleteReactionFromPost: (reaction: AddReaction) => `/api/posts/${reaction.postId}`,
  },
}
