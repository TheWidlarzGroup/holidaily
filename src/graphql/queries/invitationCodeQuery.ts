import request, { gql } from 'graphql-request'
import { GRAPHQL_ENDPOINT } from '@env'

export const invitationCodeQuery = (code: string) =>
  request(
    GRAPHQL_ENDPOINT,
    gql`
      query {
        checkInvitation(code: "${code}") {
          expired
          email
          user {
            organization {
              name
            }
          }
        }
      }
    `
  )
