export const graphQLSchema = `
  type User {
    confirmed: Boolean
    email: String
    firstName: String
    id: ID
    lastName: String
    occupation: String
  }

  input UserInput {
    firstName: String
  }

  type Mutation {
    createUser(input: UserInput!): User
  }

  type Query {
    allUsers: [User]
    user(firstName: String!): User
  }
`
