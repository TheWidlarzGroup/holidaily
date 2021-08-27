export type UpdateUserTypes = {
  firstName: string
  lastName: string
  occupation: string
  //   color: string
}

export type UpdateUserDataTypes = {
  updateUser: {
    id: string
    firstName: string
    lastName: string
    occupation: string
    // color: string
  }
}

export type ErrorTypes = {
  message: string
}

// TODO: add color when BE ready
