import { Factory } from 'miragejs'
import { faker } from '@faker-js/faker'

export const userFactory = Factory.extend({
  confirmed: true,
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  occupation: faker.name.jobTitle(),
  requests: [],
  userColor: '#FF8B3F',
  language: 'en',
  photo: null,
  role: 'Admin',
  availablePto: Math.round(Math.random() * 24),
})
