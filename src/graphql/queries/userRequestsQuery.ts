import { gql } from 'graphql-request'
import { client } from 'graphqlActions/client'

export const userRequestsQuery = () =>
  client.request(
    gql`
      query {
        requests {
          id
          description
          range
          status
          message
          sickTime
        }
      }
    `
  )
