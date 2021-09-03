import { gql } from 'graphql-request'
import { authorizedClient } from 'graphqlActions/client'

export const approveRequestMutation = (requestId: string) =>
  authorizedClient.request(
    gql`
      mutation {
        approveRequest(id: "${requestId}") {
          id
          status
        }
      }
    `
  )
