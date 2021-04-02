import { gql } from 'graphql-request'

export const LOGIN_USER = gql`
  mutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`
