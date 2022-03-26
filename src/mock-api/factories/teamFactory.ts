import { Factory } from 'miragejs'

export const teamFactory = Factory.extend({
  id: '1',
  name: '',
  users: [],
  // @ts-ignore
  // afterCreate(user, server) {
  //   server.createList('user', 10, { user })
  // },
})
