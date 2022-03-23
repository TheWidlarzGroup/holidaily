import { gql } from 'graphql-request'
import { authorizedClient } from 'legacy/client'

export const userRequestsQuery = () =>
  authorizedClient.request(
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
