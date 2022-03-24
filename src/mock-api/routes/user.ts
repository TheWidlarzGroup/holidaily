import { Request, Server } from 'miragejs'
import Schema from 'miragejs/orm/schema'
import { Schema as ModelsSchema } from '../models'

export function userRoutes(context: Server<ModelsSchema>) {
  return [context.get('/users'), fetchAllUsers, context.get('/user/:id'), fetchUserDataById]
}

function fetchAllUsers(schema: Schema<ModelsSchema>) {
  return schema.all('users')
}

function fetchUserDataById(schema: Schema<ModelsSchema>, req: Request) {
  return schema.find('users', req.params.id)
}
