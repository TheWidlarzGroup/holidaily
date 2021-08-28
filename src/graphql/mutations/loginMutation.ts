import request, { gql } from 'graphql-request'
import { LoginTypes } from 'types/useLoginTypes'
import { GRAPHQL_ENDPOINT } from '@env'

export const loginMutation = ({ email, password }: LoginTypes) =>
  request(
    GRAPHQL_ENDPOINT,
    gql`
    mutation{
      loginUser(email: "${email}", password: "${password}") {
        token
        user{
          id
          email
          confirmed
          firstName
          lastName
          occupation
          role
        }
      }
    }
  `
  )
