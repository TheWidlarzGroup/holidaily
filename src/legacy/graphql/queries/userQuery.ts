import { gql } from 'graphql-request'
import { authorizedClient } from 'legacy/client'

export const userQuery = () =>
  authorizedClient.request(
    gql`
      query {
        user {
          email
          confirmed
          firstName
          lastName
          occupation
          role
          organization {
            name
          }
        }
      }
    `
  )
