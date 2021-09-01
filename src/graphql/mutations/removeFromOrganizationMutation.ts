import { gql } from 'graphql-request'
import { authorizedClient } from 'graphqlActions/client'
import { RemoveFromOrganizationTypes } from 'types/useRemoveFromOrganizationTypes'

export const removeFromOrganizationMutation = ({ userId }: RemoveFromOrganizationTypes) =>
  authorizedClient.request(
    gql`
      mutation {
        removeFromOrganization(
          userId: "${userId}",
        ) {
          id
          confirmed
          email
          firstName
          lastName
          occupation
          role
        }
      }
    `
  )
