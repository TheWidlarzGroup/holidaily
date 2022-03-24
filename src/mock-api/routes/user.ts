import { Request, Server } from 'miragejs'
import { Organization } from 'mock-api/models/Organization'
import { User } from 'mock-api/models/User'
import Schema from 'miragejs/orm/schema'

export function userRoutes(context: Server<ModelsSchema>) {
  return [context.get('/users'), fetchAllUsers, context.get('/user/:id'), fetchUserDataById]
}

function fetchAllUsers(schema: Schema<ModelsSchema>) {
  return schema.all('users')
}

function fetchUserDataById(schema: Schema<ModelsSchema>, req: Request) {
  return schema.find('users', req.params.id)
}

type ModelsSchema = {
  users: User[]
  organizations: Organization[]
}
