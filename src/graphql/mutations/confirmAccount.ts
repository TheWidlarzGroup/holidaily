import request, { gql } from 'graphql-request'
import { GRAPHQL_ENDPOINT } from '@env'
import { ConfirmTypes } from 'types/useConfirmAccountTypes'

export const confirmAccount = ({ email, token }: ConfirmTypes) =>
  request(
    GRAPHQL_ENDPOINT,
    gql`
    mutation{
      confirmAccount(email: "${email}", token: "${token}") {
        confirmed
      }
    }
  `
  )
