import { gql } from 'graphql-request'
import { client } from 'graphqlActions/client'

export const approveRequestMutation = (requestId: string) =>
  client.request(
    gql`
      mutation {
        approveRequest(id: "${requestId}") {
          id
          status
        }
      }
    `
  )
