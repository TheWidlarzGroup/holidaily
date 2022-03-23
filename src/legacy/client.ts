import { GraphQLClient } from 'graphql-request'
import { GRAPHQL_ENDPOINT } from '@env'

export const authorizedClient = new GraphQLClient(GRAPHQL_ENDPOINT)

export const authorizeClient = (token: string) => {
  if (token) {
    authorizedClient.setHeader('Authorization', `Bearer ${token}`)
  }
}
