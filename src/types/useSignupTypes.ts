export type SignupTypes = {
  email: string
  firstName: string
  lastName: string
  organizationName: string
  password: string
}

export type CreateUserTypes = {
  createOrganization: {
    email: string
  }
}
