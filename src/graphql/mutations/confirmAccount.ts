import request, { gql } from 'graphql-request'
import { endpoint } from '../../utils/config/endpoint'
import { ConfirmTypes } from '../../types/useConfirmAccountTypes'

export const confirmAccount = ({
  email,
  token = 'SFMyNTY.g2gDbQAAACQzZWYyMDE4Mi0yNmY1LTRkM2ItOWUwYy0zN2U4OTA2ZmZiNDduBgB45ZegeAFiAAFRgA.Kga-MQFlhAtc69tD2V-d0WeKpnQGQJVdNnl611e7Y3Q',
}: ConfirmTypes) =>
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
