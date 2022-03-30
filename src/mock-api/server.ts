import { createServer, RestSerializer } from 'miragejs'
import { genRandomDayOffRequest } from './factories/requestFactory'
import { usersList } from './factories/userFactory'
import { Models } from './models'
import { dayOffRoutes } from './routes/dayOffRequest'
import { organizationRoute } from './routes/organization'
import { teamRoutes } from './routes/team'
import { userRoutes } from './routes/user'

export const initBackendMocks = () =>
  createServer({
    serializers: {
      organization: RestSerializer.extend({ include: ['teams'], embed: true }),
      team: RestSerializer.extend({ include: ['users'], embed: true }),
      user: RestSerializer.extend({ include: ['requests'], embed: true }),
    },
    models: Models,
    factories: {},
    routes() {
      this.namespace = 'api'
      userRoutes(this)
      dayOffRoutes(this)
      organizationRoute(this)
      teamRoutes(this)
    },
    seeds(server) {
      const users = usersList.map((user) => {
        const userRecord = server.create('user', user)
        server.create('request', { ...genRandomDayOffRequest(), user: userRecord })
        return userRecord
      })
      const team1 = server.create('team', {
        name: 'SmartSoft',
        users: users.splice(0, 4),
      })
      const team2 = server.create('team', {
        name: 'FileCode',
        users: users.splice(4, 8),
      })
      const team3 = server.create('team', {
        name: 'Softlab',
        users: users.splice(8, 12),
      })
      const team4 = server.create('team', {
        name: 'Open Byte',
        users: users.splice(12, 16),
      })
      const team5 = server.create('team', {
        name: 'Spaceware',
        users: users.splice(20, 24),
      })
      const team6 = server.create('team', {
        name: 'Webrain',
        users: users.splice(24, 28),
      })
      const team7 = server.create('team', {
        name: 'Pharmic',
        users: users.splice(28, 32),
      })
      const team8 = server.create('team', {
        name: 'NMedical',
        users: users.splice(32, 36),
      })
      const team9 = server.create('team', {
        name: 'Encrypto',
        users: users.splice(36, 40),
      })
      server.create('organization', {
        name: 'Supercompany',
        maxPtoDays: 30,
        teams: [team1, team2, team3, team4, team5, team6, team7, team8, team9],
      })
    },
  })
