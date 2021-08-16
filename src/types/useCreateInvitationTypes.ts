export const roles = ['MANAGER', 'DEVELOPER', 'USER', 'GUEST', 'ACCOUNTANT']
export type RoleTypes = typeof roles[number]

export type CreateInvitationTypes = { email: string; role: RoleTypes }

export type InvitationTypes = {
  createInvitation: {
    code: string
    email: string
    expired: boolean
    expiresAt: string
    id: string
  }
}
