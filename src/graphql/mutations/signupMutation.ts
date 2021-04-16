import request, { gql } from 'graphql-request'
import { SignupTypes } from 'types/useSignupTypes'
import { GRAPHQL_ENDPOINT } from '@env'

export const signupMutation = ({ email, firstName, lastName, password }: SignupTypes) =>
  request(
    GRAPHQL_ENDPOINT,
    gql`
    mutation{
      createUser(email: "${email}",firstName: "${firstName}", lastName:"${lastName}", password: "${password}") {
        email
      }
    }
  `
  )
