import { createServer } from 'miragejs'
import { userFactory } from './factories/userFactory'
import { Models } from './models'
import { dayOffRoutes } from './routes/dayOffRequest'
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
      dayOffRoutes(this)
    },
    seeds(server) {
      server.create('user', { firstName: 'Adam', occupation: 'UX designer' })
      server.create('user')
      const userDzony = server.create('user', { firstName: 'Dzony', id: 'dzony' })

      server.create('dayOffRequest', {
        id: '0',
        description: 'test',
        message: 'string',
        range: [new Date(), new Date(Date.now() + 24 * 3600 * 1000)],
        sickTime: false,
        status: 'PENDING',
        user: userDzony,
      })
      console.log('DZONY: ', userDzony)
    },
  })
