export type ConfirmTypes = {
  email: string
  token: string
}

export type ConfirmMutationTypes = {
  confirmAccount: {
    confirmed: boolean
  }
}
