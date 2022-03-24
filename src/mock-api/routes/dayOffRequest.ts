import { Request, Server } from 'miragejs'
import Schema from 'miragejs/orm/schema'
import { Schema as ModelsSchema } from '../models'

export function dayOffRoutes(context: Server<ModelsSchema>) {
  return [context.get('/requests/:userId'), fetchUserRequests]
}
function fetchUserRequests(schema: Schema<ModelsSchema>, req: Request) {
  return schema.findBy<'dayOffRequests'>(
    'dayOffRequests',
    (a) => !!a.attrs.find((rec) => rec.user.id === req.params.userId)
  )
}
