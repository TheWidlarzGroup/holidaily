// import { gql } from 'graphql-request'
// import { authorizedClient } from 'graphqlActions/client'
// import { CreateInvitationsTypes } from 'types/useCreateInvitationTypes'

// export const createInviationsMutation = (invitations: CreateInvitationsTypes) =>
//   authorizedClient.request(
//     gql`
//     mutation{
//       createInvitations(input: ${invitations
//         .map((invitation) => `{email: "${invitation.email}", role: ${invitation.role}}`)
//         .join(',')}) {
//         code
//         email
//         expired
//         expiresAt
//         id
//       }
//     }
//   `
//   )
