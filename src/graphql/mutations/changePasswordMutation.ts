import { gql } from 'graphql-request'
import { ChangePasswordTypes } from 'types/useChangePasswordTypes'
import { authorizedClient } from 'graphqlActions/client'

export const changePasswordMutation = ({
  password,
  newPassword,
  newPasswordConfirmation,
}: ChangePasswordTypes) =>
  authorizedClient.request(
    gql`
      mutation {
        changePassword (
          password: "${password}", 
          newPassword: "${newPassword}", 
          newPasswordConfirmation: "${newPasswordConfirmation}"
        ) { 
          id 
        }
      }
    `
  )
