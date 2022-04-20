// import request, { gql } from 'graphql-request'
// import { ResetPasswordTypes } from 'types/useResetPasswordTypes'
// import { GRAPHQL_ENDPOINT } from '@env'

// export const resetPasswordMutation = ({
//   email,
//   code,
//   newPassword,
//   newPasswordConfirmation,
// }: ResetPasswordTypes) =>
//   request(
//     GRAPHQL_ENDPOINT,
//     gql`
//       mutation {
//         resetPassword(code: "${code}", email: "${email}", newPassword: "${newPassword}", newPasswordConfirmation: "${newPasswordConfirmation}")
//       }
//     `
//   )
