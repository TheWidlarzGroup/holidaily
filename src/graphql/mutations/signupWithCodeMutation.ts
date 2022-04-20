// import request, { gql } from 'graphql-request'
// import { SignupWithCodeTypes } from 'types/useSignupTypes'
// import { GRAPHQL_ENDPOINT } from '@env'

// export const signupWithCodeMutation = ({
//   code,
//   firstName,
//   lastName,
//   password,
// }: SignupWithCodeTypes) =>
//   request(
//     GRAPHQL_ENDPOINT,
//     gql`
//     mutation{
//       createUser(code: "${code}", firstName: "${firstName}", lastName:"${lastName}", password: "${password}") {
//         email
//       }
//     }
//   `
//   )
