export const API = {
  GET: {
    allUsers: '/api/users',
    user: (id: string) => `api/users/${id}`,
    getOrganization: '/api/organization',
    getPosts: '/api/posts',
  },

  POST: {
    createTempUser: '/api/users',
    addPost: '/api/addpost',
  },
}
