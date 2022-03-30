export const API = {
  GET: {
    allUsers: '/api/users',
    user: (id: string) => `api/users/${id}`,
  },

  POST: {
    createTempUser: '/api/users',
  },
}
