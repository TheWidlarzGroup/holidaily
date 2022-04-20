// import request, { gql } from 'graphql-request'
// import { CreateOrganizationTypes } from 'types/useSignupTypes'
// import { GRAPHQL_ENDPOINT } from '@env'

// export const createOrganizationMutation = ({
//   email,
//   firstName,
//   lastName,
//   password,
//   organizationName,
// }: CreateOrganizationTypes) =>
//   request(
//     GRAPHQL_ENDPOINT,
//     gql`
//     mutation{
//       createOrganization(email: "${email}",firstName: "${firstName}", lastName:"${lastName}", password: "${password}", organizationName: "${organizationName}") {
//         email
//       }
//     }
//   `
//   )
