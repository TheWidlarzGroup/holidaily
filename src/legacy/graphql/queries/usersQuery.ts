import { gql } from 'graphql-request'
import { authorizedClient } from 'legacy/client'

export const usersQuery = () =>
  authorizedClient.request(
    gql`
      query {
        users {
          id
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
