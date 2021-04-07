import request, { gql } from 'graphql-request'
import { LoginTypes } from '../../types/useLoginTypes'
import { endpoint } from '../../utils/config/endpoint'

export const loginMutation = ({ email, password }: LoginTypes) =>
  request(
    endpoint,
    gql`
    mutation{
      loginUser(email: "${email}", password: "${password}") {
        token
        user{
          confirmed
        }
      }
    }
  `
  )
