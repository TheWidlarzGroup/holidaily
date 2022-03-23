import { createServer, Model, Factory } from 'miragejs'

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
      this.get('/movies', () => this.schema.movies.all())
      this.get('/users', () => this.schema.users.all())
    },
    seeds(server) {
      server.create('user', { firstName: 'Adam', occupation: 'UX designer' })
      server.create('user')
      server.create('user')
    },
  })

// // GET /orgranization/:name
// type Organization = {
//   id: string
//   name: string
//   // tutaj dane z polityki urlopowej firmy
//   maxPtoDays: number
//   teams: Team[]
// }

// type User = {
//   confirmed: boolean
//   email: string
//   firstName: string
//   id: string
//   lastName: string
//   occupation: string
//   organization: Organization
//   userColor: string
//   language: 'pl' | 'en'
//   photo: string | null
// }

// type Team = {
//   id: string
//   name: string
//   users: TeamUser[]
// }

// type TeamUser = {
//   id: string
//   name: string
//   requests: TeamUserRequest[]
// }

// type TeamUserRequest = {
//   id: string
//   status: 'CANCELLED' | 'APPROVED' | 'PENDING' | 'PAST'
//   start: string // '06/05/2020',
//   end: string // '10/05/2000',
//   count: number // integer -> sobota/niedziela/swieto sie nie liczy
//   createdAt: string
// }
