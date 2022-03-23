import { gql } from 'graphql-request'
import { authorizedClient } from 'legacy/client'

export const availablePtoQuery = () =>
  authorizedClient.request(
    gql`
      query {
        availableDaysOff
      }
    `
  )
