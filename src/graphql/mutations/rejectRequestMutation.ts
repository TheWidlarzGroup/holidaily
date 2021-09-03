import { gql } from 'graphql-request'
import { authorizedClient } from 'graphqlActions/client'

export const rejectRequestMutation = (requestId: string) =>
  authorizedClient.request(
    gql`
      mutation {
        rejectRequest(id: "${requestId}") {
          id
          status
        }
      }
    `
  )
