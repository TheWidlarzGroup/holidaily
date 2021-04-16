import request, { gql } from 'graphql-request'

import { RecoveryArgumentsTypes } from 'types/useRecoveryTypes'
import { GRAPHQL_ENDPOINT } from '@env'

export const recoveryMutation = ({ email }: RecoveryArgumentsTypes) =>
  request(
    GRAPHQL_ENDPOINT,
    gql`
    mutation{
      recoverPassword(email: "${email}") {
        user{
          confirmed
        }
      }
    }
  `
  )
