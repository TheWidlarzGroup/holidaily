import { createServer } from 'miragejs'
import { createGraphQLHandler } from '@miragejs/graphql'
import { graphQLSchema } from './gql/schema'

export function makeServer() {
  return createServer({
    routes() {
      const graphQLHandler = createGraphQLHandler(graphQLSchema, this.schema, {
        resolvers: {
          Mutation: {
            createUser: (obj: any, args: any, context: any) => !!mirageGraphQLFieldResolver(...arguments),
          },
        },
      })

      this.post('/graphql', graphQLHandler)
    },
    seeds(server) {
      server.create('User', {
        confirmed: true,
        email: 'aaa@aa.com',
        firstName: 'Luk',
        id: '1',
        lastName: 'Aaa',
        occupation: 'BBbbbb',
      })
    },
  })
}
