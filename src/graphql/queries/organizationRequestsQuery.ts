import { gql } from 'graphql-request'
import { client } from 'graphqlActions/client'
import { FILTER } from 'types/useOrganizationRequestsTypes'

export const organizationRequestsQuery = (filter: FILTER) =>
  client.request(
    gql`
      query {
        organizationRequests${filter && filter !== 'ALL' ? `(filter: ${filter})` : ''} {
          id
          description
          status
          sickTime
          range
          user {
            firstName
            lastName
          }
        }
      }
    `
  )
