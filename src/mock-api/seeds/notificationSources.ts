import { Server } from 'miragejs'
import { Schema as ModelsSchema } from 'mockApi/models'

export const notificationSources = (context: Server<ModelsSchema>) => {
  context.create('user', {
    firstName: 'June',
    lastName: 'Osbourne',
    color: '#FD8989',
    id: 'source-june',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
  })
  context.create('user', {
    firstName: 'Peter',
    lastName: 'Kansas',
    color: '#FF88DC',
    id: 'source-peter',
    photo: 'https://randomuser.me/api/portraits/men/62.jpg',
  })
  context.create('user', {
    firstName: 'Tom',
    lastName: 'Waits',
    color: '#91A6FF',
    id: 'source-tom',
    photo: 'https://randomuser.me/api/portraits/men/15.jpg',
  })
}
