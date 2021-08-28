import { gql } from 'graphql-request'
import { authorizedClient } from 'graphqlActions/client'

export const userQuery = () =>
  authorizedClient.request(
    gql`
      query {
        user {
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
