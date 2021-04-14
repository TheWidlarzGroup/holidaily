import request, { gql } from 'graphql-request'
import { endpoint } from 'utils/config/endpoint'
import { ConfirmTypes } from 'types/useConfirmAccountTypes'

export const confirmAccount = ({ email, token }: ConfirmTypes) =>
  request(
    endpoint,
    gql`
    mutation{
      confirmAccount(email: "${email}", token: "${token}") {
        confirmed
      }
    }
  `
  )
