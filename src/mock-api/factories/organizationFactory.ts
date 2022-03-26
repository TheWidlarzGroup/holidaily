import { Factory } from 'miragejs'

export const organizationFactory = Factory.extend({
  id: '1',
  name: 'Supercompany',
  maxPtoDays: 30,
  teams: [],
  // @ts-ignore
  afterCreate(organization, server) {
    organization.update({
      teams: server.createList('team', 5),
    })
  },
})
