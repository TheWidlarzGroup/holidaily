import { AddComment, AddReaction, EditComment, FeedPost } from 'mockApi/models/miragePostTypes'

export const API = {
  GET: {
    allUsers: '/api/users',
    user: (id: string) => `api/users/${id}`,
    getOrganization: '/api/organization',
    notifications: '/api/notifications',
    getPosts: '/api/posts',
    userRequests: '/api/requests',
    userStats: '/api/stats',
  },
  POST: {
    createTempUser: '/api/users',
    addPost: '/api/addpost',
    addPostWithNewId: '/api/addpost/postId',
    createDayOff: '/api/request',
    addCommentToPost: (comment: AddComment) => `/api/posts/${comment.postId}`,
  },
  PATCH: {
    markNotificationAsSeen: (id: string) => `/api/notifications/seen/${id}`,
    markNotificationAsUnseen: (id: string) => `/api/notifications/unseen/${id}`,
  },
  PUT: {
    editUser: '/api/users',
    addReactionToPost: (reaction: AddReaction) => `/api/posts/${reaction.postId}`,
    editComment: (comment: EditComment) => `/api/comment/${comment.commentId}`,
    editPost: (post: FeedPost) => `/api/posts/edit/${post.id}`,
  },
  DELETE: {
    deleteComment: (commentId: string) => `/api/comment/${commentId}`,
    deletePost: (postId: string) => `/api/posts/${postId}`,
  },
}
