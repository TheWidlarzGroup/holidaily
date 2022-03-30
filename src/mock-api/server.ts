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
        const userRecord = server.create('user', {
          ...user,
        })
        server.create('request', { ...genRandomDayOffRequest(), user: userRecord })
        return userRecord
      })
      const team1 = server.create('team', {
        name: 'SmartSoft',
        users: [users[1], users[2], users[3], users[4], users[29], users[39], users[19]],
      })
      const team2 = server.create('team', {
        name: 'FileCode',
        users: [users[5], users[6], users[7], users[14], users[17], users[21], users[33]],
      })
      const team3 = server.create('team', {
        name: 'Softlab',
        users: [users[8], users[9], users[10], users[15], users[13], users[22], users[32]],
      })
      const team4 = server.create('team', {
        name: 'Open Byte',
        users: [users[11], users[12], users[16], users[20], users[2], users[1], users[19]],
      })
      const team5 = server.create('team', {
        name: 'Spaceware',
        users: [users[17], users[18], users[19], users[20], users[5], users[11], users[8]],
      })
      const team6 = server.create('team', {
        name: 'Webrain',
        users: [users[21], users[22], users[23], users[24], users[12], users[5], users[9]],
      })
      const team7 = server.create('team', {
        name: 'Pharmic',
        users: [users[25], users[26], users[27], users[28], users[3], users[2], users[11]],
      })
      const team8 = server.create('team', {
        name: 'NMedical',
        users: [users[29], users[30], users[31], users[32], users[5], users[6], users[7]],
      })
      const team9 = server.create('team', {
        name: 'Encrypto',
        users: [users[33], users[34], users[35], users[36], users[37], users[38], users[39]],
      })
      server.create('organization', {
        name: 'Supercompany',
        maxPtoDays: 30,
        teams: [team1, team2, team3, team4, team5, team6, team7, team8, team9],
      })
    },
  })
