export const roles = ['Manager', 'User', 'Guest', 'Admin']
export type RoleTypes = typeof roles[number]

export type CreateInvitationTypes = { email: string; role: RoleTypes }
export type CreateInvitationsTypes = CreateInvitationTypes[]

export type InvitationsTypes = {
  createInvitations: {
    code: string
    email: string
    expired: boolean
    expiresAt: string
    id: string
  }[]
}
