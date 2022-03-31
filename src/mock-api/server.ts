import { createServer, RestSerializer } from 'miragejs'
import { posts } from './factories/posts'
import { genRandomDayOffRequest } from './factories/requestFactory'
import { usersList } from './factories/userFactory'
import { Models } from './models'
import { dayOffRoutes } from './routes/dayOffRequest'
import { organizationRoute } from './routes/organization'
import { postsRoute } from './routes/post'
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
      postsRoute(this)
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
        users: users.slice(0, 6),
      })
      const team2 = server.create('team', {
        name: 'FileCode',
        users: users.slice(4, 10),
      })
      const team3 = server.create('team', {
        name: 'Softlab',
        users: users.slice(7, 13),
      })
      const team4 = server.create('team', {
        name: 'Open Byte',
        users: users.slice(11, 16),
      })
      const team5 = server.create('team', {
        name: 'Spaceware',
        users: users.slice(15, 22),
      })
      const team6 = server.create('team', {
        name: 'Webrain',
        users: users.slice(22, 27),
      })
      const team7 = server.create('team', {
        name: 'Pharmic',
        users: users.slice(27, 32),
      })
      const team8 = server.create('team', {
        name: 'NMedical',
        users: users.slice(30, 37),
      })
      const team9 = server.create('team', {
        name: 'Encrypto',
        users: users.slice(36, 40),
      })
      server.create('organization', {
        name: 'Supercompany',
        maxPtoDays: 30,
        teams: [team1, team2, team3, team4, team5, team6, team7, team8, team9],
      })
      // @ts-ignore
      posts.map((post) => server.create('post', post))
    },
  })
