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
  },
}
