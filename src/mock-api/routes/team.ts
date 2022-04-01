import { Request, Server } from 'miragejs'
import Schema from 'miragejs/orm/schema'
import { Schema as ModelsSchema } from '../models'

export function teamRoutes(context: Server<ModelsSchema>) {
  context.get('/api/team/:id', fetchTeam)
}
function fetchTeam(schema: Schema<ModelsSchema>, req: Request) {
  // @ts-ignore
  return schema.all('team', req.params.id)
}
