import request, { gql } from 'graphql-request'
import { LoginTypes } from 'types/useLoginTypes'
import { GRAPHQL_ENDPOINT } from '@env'

export const loginMutation = ({ email, password }: LoginTypes) =>
  request(
    //GRAPHQL_ENDPOINT,
    'http://192.168.0.11:4000/api/graphiql',
    gql`
    mutation{
      loginUser(email: "${email}", password: "${password}") {
        token
        user{
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
