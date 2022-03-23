import { gql } from 'graphql-request'
import { UpdateUserTypes } from 'types/useUpdateUserTypes'
import { authorizedClient } from 'legacy/client'

export const updateUserMutation = ({ firstName, lastName, occupation }: UpdateUserTypes) =>
  authorizedClient.request(
    gql`
    mutation {
      updateUser (firstName: "${firstName}", lastName: "${lastName}", occupation:"${occupation}") {
        id
        firstName
        lastName
        occupation
      }
    }
    `
  )
