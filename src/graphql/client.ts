import { GraphQLClient } from 'graphql-request'
import { GRAPHQL_ENDPOINT } from '@env'
import { getItemAsync } from 'expo-secure-store'

const getToken = async () => getItemAsync('token')

export const client = new GraphQLClient(GRAPHQL_ENDPOINT)
getToken().then((token) => {
  client.setHeader('Authorization', `Bearer ${token}`)
})
