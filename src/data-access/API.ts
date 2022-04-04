import { AddComment, AddReaction } from 'mockApi/models/miragePostTypes'

export const API = {
  GET: {
    allUsers: '/api/users',
    user: (id: string) => `api/users/${id}`,
    getOrganization: '/api/organization',
    notifications: '/api/notifications',
    getPosts: '/api/posts',
    userRequests: '/api/requests',
  },

  POST: {
    createTempUser: '/api/users',
    addPost: '/api/addpost',
    addCommentToPost: (comment: AddComment) => `/api/posts/${comment.postId}`,
  },
  PUT: {
    editUser: '/api/users',
    addReactionToPost: (reaction: AddReaction) => `/api/posts/${reaction.postId}`,
  },
  PATCH: {
    markNotificationAsSeen: (id: string) => `/api/notifications/seen/${id}`,
  },
}
