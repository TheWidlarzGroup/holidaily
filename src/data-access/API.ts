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
    createDayOff: '/api/request',
  },

  PATCH: {
    markNotificationAsSeen: (id: string) => `/api/notifications/seen/${id}`,
  },
  PUT: {
    editUser: '/api/users',
  },
}
