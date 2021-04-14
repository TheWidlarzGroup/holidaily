import request, { gql } from 'graphql-request'

import { RecoveryArgumentsTypes } from '../../types/useRecoveryTypes'
import { endpoint } from '../../utils/config/endpoint'

export const recoveryMutation = ({ email }: RecoveryArgumentsTypes) =>
  request(
    endpoint,
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
