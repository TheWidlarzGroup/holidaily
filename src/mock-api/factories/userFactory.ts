import { Factory } from 'miragejs'

export const userFactory = Factory.extend({
  confirmed: true,
  email: `test-user-${Math.round(Math.random() * 1000)}@gmail.com`,
  firstName: `user-name${Math.round(Math.random() * 1000)}`,
  lastName: `user-lastname${Math.round(Math.random() * 1000)}`,
  occupation: 'dev',
  color: '#fff',
  language: 'pl',
  photo: null,
})
