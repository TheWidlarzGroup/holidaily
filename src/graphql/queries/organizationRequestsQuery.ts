import { gql } from 'graphql-request'
import { authorizedClient } from 'graphqlActions/client'
import { FILTER } from 'types/useOrganizationRequestsTypes'

export const organizationRequestsQuery = (filter: FILTER) =>
  authorizedClient.request(
    gql`
      query {
        organizationRequests${filter && filter !== 'ALL' ? `(filter: ${filter})` : ''} {
          id
          description
          message
          status
          sickTime
          range
          user {
            firstName
            lastName
            occupation
            email
          }
        }
      }
    `
  )
