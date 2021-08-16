export type SignupWithCodeTypes = {
  code: string
  firstName: string
  lastName: string
  password: string
  role?: string
}

export type SignupWithCodeDataTypes = {
  createUser: {
    email: string
  }
}

export type CreateOrganizationTypes = {
  email: string
  firstName: string
  lastName: string
  organizationName: string
  password: string
}

export type CreateOrganizationDataTypes = {
  createOrganization: {
    email: string
  }
}
