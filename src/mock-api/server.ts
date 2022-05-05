import { createServer, RestSerializer } from 'miragejs'
import { postsSeed } from './seeds/postsSeed'
import { requestFactory } from './factories/requestFactory'
import { userFactory } from './factories/userFactory'
import { Models } from './models'
import { dayOffRoutes } from './routes/dayOffRequest'
import { notificationRoutes } from './routes/notifications'
import { organizationRoute } from './routes/organization'
import { postsRoute } from './routes/post'
import { statsRoutes } from './routes/stats'
import { userRoutes } from './routes/user'
import { notificationSources } from './seeds/notificationSources'
import { organizationSeed } from './seeds/organizationSeed'

export const initBackendMocks = () =>
  createServer({
    serializers: {
      organization: RestSerializer.extend({ include: ['teams'], embed: true }),
      team: RestSerializer.extend({ include: ['users'], embed: true }),
      user: RestSerializer.extend({ include: ['requests'], embed: true }),
      notification: RestSerializer.extend({ include: ['source'], embed: true }),
      post: RestSerializer.extend({ include: ['comments', 'reactions'], embed: true }),
    },
    models: Models,
    factories: {
      userFactory,
      requestFactory,
    },
    routes() {
      this.namespace = 'api'
      userRoutes(this)
      dayOffRoutes(this)
      organizationRoute(this)
      postsRoute(this)
      notificationRoutes(this)
      statsRoutes(this)
    },
    seeds(server) {
      notificationSources(server)
      organizationSeed(server)
      postsSeed(server)
    },
  })
