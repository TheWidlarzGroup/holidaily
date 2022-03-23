import { createServer, Model, Factory } from 'miragejs'
import { userRoutes } from './routes/user'

export const initBackendMocks = () =>
  createServer({
    models: {
      movie: Model,
      user: Model,
      organization: Model,
    },
    factories: {
      user: Factory.extend({
        confirmed: true,
        email: `test-user-${Math.round(Math.random() * 1000)}@gmail.com`,
        firstName: `user-name${Math.round(Math.random() * 1000)}`,
        lastName: `user-lastname${Math.round(Math.random() * 1000)}`,
        occupation: 'dev',
        color: '#fff',
        language: 'pl',
        photo: null,
      }),
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
