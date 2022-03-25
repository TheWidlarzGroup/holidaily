import { createServer } from 'miragejs'
import { userFactory } from './factories/userFactory'
import { Models } from './models'
import { userRoutes } from './routes/user'
import { teamUserRequests } from './models/organization-data'
import { organizationRoutes } from './routes/organization'

export const initBackendMocks = () =>
  createServer({
    // serializers: { application: JSONAPISerializer },
    models: Models,
    factories: {
      user: userFactory,
    },
    // fixtures: {
    //   teamUserRequests,
    // },
    routes() {
      this.namespace = 'api'
      userRoutes(this)
      organizationRoutes(this)
    },
    seeds(server) {
      server.create('user', { firstName: 'Adam', occupation: 'UX designer' })
      server.create('user')
      server.create('user')
      const teamUser1 = server.create('teamUser', { id: '1', name: '', requests: teamUserRequests })
      const team1 = server.create('team', {
        name: 'SmartSoft',
        users: [teamUser1],
      })
      server.create('organization', {
        id: '1',
        name: 'Supercompany',
        maxPtoDays: 30,
        teams: [team1],
      })
    },
  })
