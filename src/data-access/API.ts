export const API = {
  GET: {
    allUsers: '/api/users',
    user: (id: string) => `api/users/${id}`,
    getOrganization: '/api/organization',
    userRequests: '/api/requests',
  },

  POST: {
    createTempUser: '/api/users',
  },
  PUT: {
    editUser: '/api/users',
  },
}
