import { gql } from 'graphql-request'
import { authorizedClient } from 'graphqlActions/client'

export const availablePtoQuery = () =>
  authorizedClient.request(
    gql`
      query {
        availableDaysOff
      }
    `
  )
