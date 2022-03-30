import { Server } from 'miragejs'
import { Schema as ModelsSchema } from 'mockApi/models'

export const notificationSources = (context: Server<ModelsSchema>) => {
  context.create('user', {
    firstName: 'June',
    lastName: 'Osbourne',
    color: '#FD8989',
    id: 'source-june',
  })
  context.create('user', {
    firstName: 'Peter',
    lastName: 'Kansas',
    color: '#FF88DC',
    id: 'source-peter',
  })
  context.create('user', {
    firstName: 'Tom',
    lastName: 'Waits',
    color: '#91A6FF',
    id: 'source-tom',
  })
}
