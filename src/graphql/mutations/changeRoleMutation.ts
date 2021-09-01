import { gql } from 'graphql-request'
import { authorizedClient } from 'graphqlActions/client'
import { ChangeRoleTypes } from 'types/useChangeRoleTypes'

export const changeRoleMutation = ({ userId, role }: ChangeRoleTypes) =>
  authorizedClient.request(
    gql`
      mutation {
        changeRole(
          role: "${role}",
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
