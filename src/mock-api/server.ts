import { createServer, RestSerializer } from 'miragejs'
import { organizationFactory } from './factories/organizationFactory'
import { requestFactory } from './factories/requestFactory'
import { teamFactory } from './factories/teamFactory'
import { userFactory } from './factories/userFactory'
import { Models } from './models'
import { dayOffRoutes } from './routes/dayOffRequest'
import { organizationRoute } from './routes/organization'
import { teamRoutes } from './routes/team'
import { userRoutes } from './routes/user'

export const initBackendMocks = () =>
  createServer({
    serializers: {
      organization: RestSerializer.extend({ include: ['teams'], embed: true }),
      team: RestSerializer.extend({ include: ['teamUsers'], embed: true }),
      teamUser: RestSerializer.extend({ include: ['requests'], embed: true }),
    },
    models: Models,
    factories: {
      // user: userFactory,
      // dayOffRequest: requestFactory,
      // team: teamFactory,
      // organization: organizationFactory,
    },
    routes() {
      this.namespace = 'api'
      userRoutes(this)
      dayOffRoutes(this)
      organizationRoute(this)
      teamRoutes(this)
    },
    seeds(server) {
      const user1 = server.create('user', {
        firstName: 'Paweł',
        lastName: 'Ogonek',
        photo: undefined,
        occupation: 'Software Engineer',
        dayOffRequest: [],
      })
      const user2 = server.create('user', {
        firstName: 'Peter',
        lastName: 'Kansas',
        photo: undefined,
        occupation: 'Software Engineer',
        dayOffRequest: [],
      })
      const user3 = server.create('user', {
        firstName: 'Tom',
        lastName: 'Waist',
        photo: undefined,
        occupation: 'Software Engineer',
        dayOffRequest: [],
      })
      const user4 = server.create('user', {
        firstName: 'Kamila',
        lastName: 'Wysokogórska',
        photo: undefined,
        occupation: 'Software Engineer',
        dayOffRequest: [],
      })
      const user5 = server.create('user', {
        firstName: 'Ola',
        lastName: 'Nowak',
        photo: undefined,
        occupation: 'Software Engineer',
        dayOffRequest: [],
      })
      const user6 = server.create('user', {
        firstName: 'Kamila',
        lastName: 'Wysokogórska-Nowak',
        photo: undefined,
        occupation: 'Software Engineer',
        dayOffRequest: [],
      })
      const teamUserRequest1 = server.create('request', {
        id: '1',
        status: 'CANCELLED',
        startDate: '06/05/2020',
        endDate: '10/05/2000',
        count: 2,
        createdAt: '10/05/2000',
      })
      const teamUser1 = server.create('teamUser', { requests: [teamUserRequest1] })
      const team1 = server.create('team', {
        name: 'SmartSoft',
        teamUsers: [teamUser1],
      })
      const team2 = server.create('team', {
        name: 'FileCode',
        teamUsers: [teamUser1],
      })
      const team3 = server.create('team', {
        name: 'Softlab',
        teamUsers: [teamUser1],
      })
      const team4 = server.create('team', {
        name: 'Open Byte',
        teamUsers: [teamUser1],
      })
      const team5 = server.create('team', {
        name: 'Spaceware',
        teamUsers: [teamUser1],
      })
      const team6 = server.create('team', {
        name: 'Webrain',
        teamUsers: [teamUser1],
      })
      const team7 = server.create('team', {
        name: 'Pharmic',
        teamUsers: [teamUser1],
      })
      const team8 = server.create('team', {
        name: 'NMedical',
        teamUsers: [teamUser1],
      })
      const team9 = server.create('team', {
        name: 'Encrypto',
        teamUsers: [teamUser1],
      })
      server.create('organization', {
        name: 'Supercompany',
        maxPtoDays: 30,
        teams: [team1, team2, team3, team4, team5, team6, team7, team8, team9],
      })
    },
  })
