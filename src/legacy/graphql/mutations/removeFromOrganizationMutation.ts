import { gql } from 'graphql-request'
import { authorizedClient } from 'legacy/client'
import { RemoveFromOrganizationTypes } from 'types/useRemoveFromOrganizationTypes'

export const removeFromOrganizationMutation = ({ userId }: RemoveFromOrganizationTypes) =>
  authorizedClient.request(
    gql`
      mutation {
        removeFromOrganization(
          userId: "${userId}",
        ) {
          id
        }
      }
    `
  )
