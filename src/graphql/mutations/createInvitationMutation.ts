import { gql } from 'graphql-request'
import { client } from 'graphqlActions/client'
import { CreateInvitationTypes } from 'types/useCreateInvitationTypes'

export const createInviationMutation = ({ email, role }: CreateInvitationTypes) =>
  client.request(
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
