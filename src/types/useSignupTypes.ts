export type SignupWithCodeTypes = {
  code: string
  firstName: string
  lastName: string
  password: string
  occupation?: string
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
