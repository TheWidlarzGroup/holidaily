import { Factory } from 'miragejs'

export const userFactory = Factory.extend({
  confirmed: true,
  email: `test-user-${Math.round(Math.random() * 1000)}@gmail.com`,
  firstName: `user-name${Math.round(Math.random() * 1000)}`,
  lastName: `user-lastname${Math.round(Math.random() * 1000)}`,
  occupation: 'dev',
  color: '#FF8B3F',
  language: 'en',
  photo: null,
  role: 'Admin',
  availablePto: Math.round(Math.random() * 24),
  // @ts-expect-error type of after create doesn't math the actual implementation, see https://github.com/miragejs/miragejs/pull/1019
  afterCreate(user, server) {
    server.createList('dayOffRequest', 10, { user })
  },
})
