export const API = {
  GET: {
    allUsers: '/api/users',
    user: (id: string) => `api/users/${id}`,
    getOrganization: '/api/organization',
    notifications: '/api/notifications',
    userRequests: '/api/requests',
  },

  POST: {
    createTempUser: '/api/users',
  },

  PATCH: {
    markNotificationAsSeen: (id: string) => `/api/notifications/seen/${id}`,
  },
}
