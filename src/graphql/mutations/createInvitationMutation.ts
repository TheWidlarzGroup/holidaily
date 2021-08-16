import { gql } from 'graphql-request'
import { authorizedClient } from 'graphqlActions/client'
import { CreateInvitationTypes } from 'types/useCreateInvitationTypes'

export const createInviationMutation = ({ email, role }: CreateInvitationTypes) =>
  authorizedClient.request(
    gql`
    mutation{
      createInvitation(email: "${email}", role: ${role}) {
        code
        email
        expired
        expiresAt
        id
      }
    }
  `
  )
