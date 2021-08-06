export type CreateInvitationTypes = { email: string; token: string }

export type InvitationTypes = {
  createInvitation: {
    code: string
    email: string
    expired: boolean
    expiresAt: string
    id: string
  }
}
