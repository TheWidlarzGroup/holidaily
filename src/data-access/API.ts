import { AddComment } from 'mockApi/models/miragePostTypes'

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
    // addReactionToPost: (id: string) => `/api/posts/${id}`,
  },
}
