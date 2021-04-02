import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'https://holidaily.danielgrychtol.com/api/graphiql',
  cache: new InMemoryCache(),
})
