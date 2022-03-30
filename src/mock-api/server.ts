import { createServer, RestSerializer } from 'miragejs'
import { requestFactory } from './factories/requestFactory'
import { userFactory } from './factories/userFactory'
import { Models } from './models'
import { dayOffRoutes } from './routes/dayOffRequest'
import { notificationRoutes } from './routes/notifications'
import { userRoutes } from './routes/user'
import { notificationSources } from './seeds/notificationSources'

export const initBackendMocks = () =>
  createServer({
    models: Models,
    factories: {
      user: userFactory,
      dayOffRequest: requestFactory,
    },
    serializers: {
      notification: RestSerializer.extend({ include: ['source'], embed: true }),
    },
    routes() {
      this.namespace = 'api'
      userRoutes(this)
      dayOffRoutes(this)
      notificationRoutes(this)
    },
    seeds(server) {
      server.createList('user', 50)
      notificationSources(server)
    },
  })
