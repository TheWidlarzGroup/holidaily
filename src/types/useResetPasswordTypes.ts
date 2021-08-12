export type ResetPasswordTypes = {
  email: string
  code: string
  newPassword: string
  newPasswordConfirmation: string
}

export type ResetPasswordDataTypes = {
  resetPassword: string
}

export type ErrorTypes = {
  message: string
}
