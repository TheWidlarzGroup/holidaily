import { createServer } from 'miragejs'
import { userFactory } from './factories/userFactory'
import { Models } from './models'
import { userRoutes } from './routes/user'

export const initBackendMocks = () =>
  createServer({
    models: Models,
    factories: {
      user: userFactory,
    },
    routes() {
      this.namespace = 'api'
      userRoutes(this)
    },
    seeds(server) {
      server.create('user', { firstName: 'Adam', occupation: 'UX designer' })
      server.create('user')
      server.create('user')
    },
  })
