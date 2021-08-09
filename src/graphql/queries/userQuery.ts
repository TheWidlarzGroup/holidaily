import { gql } from 'graphql-request'
import { client } from 'graphqlActions/client'

export const userQuery = () =>
  client.request(
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
