import { gql } from 'graphql-request'
import { authorizedClient } from 'graphqlActions/client'

export const userIdAuthHash = () =>
  authorizedClient.request(
    gql`
      query {
        userIdAuthHash
      }
    `
  )
