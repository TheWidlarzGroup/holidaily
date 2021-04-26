import request, { gql } from 'graphql-request'

import { GRAPHQL_ENDPOINT } from '@env'
import { ValidatePasswordResetCodeArgumentsTypes } from 'types/useValidatePasswordResetCodeTypes'

export const validatePasswordResetCodeMutation = ({
  email,
  code,
}: ValidatePasswordResetCodeArgumentsTypes) =>
  request(
    GRAPHQL_ENDPOINT,
    gql`
    mutation{
      validatePasswordResetCode(code: "${code}", email: "${email}") 
    }
  `
  )
