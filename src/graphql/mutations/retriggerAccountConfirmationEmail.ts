import request, { gql } from 'graphql-request'
import { GRAPHQL_ENDPOINT } from '@env'

export const retriggerAccountConfirmationEmail = () =>
  request(
    GRAPHQL_ENDPOINT,
    gql`
      mutation {
        retriggerAccountConfirmationEmail {
          email
        }
      }
    `
  )
