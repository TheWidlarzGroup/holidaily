export type RecoveryArgumentsTypes = {
  email: string
}

export type RecoveryMutationTypes = {
  recoverPassword: {
    user: {
      confirmed: boolean
    }
  }
}
