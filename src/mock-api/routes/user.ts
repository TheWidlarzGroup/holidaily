import { Request, Server } from 'miragejs'
import Schema from 'miragejs/orm/schema'
import { Schema as ModelsSchema } from '../models'

export function userRoutes(context: Server<ModelsSchema>) {
  context.get('/users', fetchAllUsers)
  context.get('/users/:id', fetchUserDataById)
}

function fetchAllUsers(schema: Schema<ModelsSchema>) {
  return schema.all('user')
}

function fetchUserDataById(schema: Schema<ModelsSchema>, req: Request) {
  return schema.find('user', req.params.id)
}
