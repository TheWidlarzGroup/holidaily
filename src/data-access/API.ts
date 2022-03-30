export const API = {
  GET: {
    allUsers: '/api/users',
    user: (id: string) => `api/users/${id}`,
    getOrganization: '/api/organization',
  },

  POST: {
    createTempUser: '/api/users',
  },
}
