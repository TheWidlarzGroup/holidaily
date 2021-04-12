import request, { gql } from 'graphql-request'
import { SignupTypes } from '../../types/useSignupTypes'
import { endpoint } from '../../utils/config/endpoint'

export const signupMutation = ({
  email,
  firstName,
  lastName,
  password,
  passwordConfirmation,
}: SignupTypes) =>
  request(
    endpoint,
    gql`
    mutation{
      createUser(email: "${email}",firstName: "${firstName}", lastName:"${lastName}", password: "${password}", passwordConfirmation: "${passwordConfirmation}") {
        token
        user{
          email
        }
      }
    }
  `
  )
