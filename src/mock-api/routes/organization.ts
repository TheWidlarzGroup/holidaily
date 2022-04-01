import { Server } from 'miragejs'
import Schema from 'miragejs/orm/schema'
import { Schema as ModelsSchema } from '../models'

export function organizationRoute(context: Server<ModelsSchema>) {
  context.get('/organization', fetchOrganization)
}
function fetchOrganization(schema: Schema<ModelsSchema>) {
  return schema.all('organization')
}
