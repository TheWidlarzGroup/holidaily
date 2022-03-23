import { gql } from 'graphql-request'
import { authorizedClient } from 'legacy/client'
import { ChangeRoleTypes } from 'types/useChangeRoleTypes'

export const changeRoleMutation = ({ userId, role }: ChangeRoleTypes) =>
  authorizedClient.request(
    gql`
      mutation {
        changeRole(
          role: ${role},
          userId: "${userId}",
        ) {
          id
        }
      }
    `
  )
