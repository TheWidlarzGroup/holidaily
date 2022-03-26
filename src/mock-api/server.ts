import { createServer } from 'miragejs'
import { organizationFactory } from './factories/organizationFactory'
import { requestFactory } from './factories/requestFactory'
import { teamFactory } from './factories/teamFactory'
import { userFactory } from './factories/userFactory'
import { Models } from './models'
import { dayOffRoutes } from './routes/dayOffRequest'
import { organizationRoute } from './routes/organization'
import { userRoutes } from './routes/user'

export const initBackendMocks = () =>
  createServer({
    models: Models,
    factories: {
      user: userFactory,
      dayOffRequest: requestFactory,
      team: teamFactory,
      organization: organizationFactory,
    },
    routes() {
      this.namespace = 'api'
      userRoutes(this)
      dayOffRoutes(this)
      organizationRoute(this)
    },
    seeds(server) {
      server.createList('user', 50)
      // const teamUser1 = server.create('teamUser', { id: '1', name: '', requests: [] })
      const team1 = server.create('team', {
        id: '1',
        name: 'SmartSoft',
        users: [],
      })
      server.create('organization', {
        id: '1',
        name: 'Supercompany',
        maxPtoDays: 30,
        teams: [team1],
      })
    },
  })
