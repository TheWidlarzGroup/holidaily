export type ChangePasswordTypes = {
  password: string
  newPassword: string
  newPasswordConfirmation: string
}

export type ChangePasswordDataTypes = {
  changePassword: {
    id: string
  }
}

export type ErrorTypes = {
  message: string
}
