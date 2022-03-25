import { Server, Request } from 'miragejs'
import { Organization } from 'mock-api/models/Organization'
import Schema from 'miragejs/orm/schema'

export function organizationRoutes(context: Server<ModelsSchema>) {
  context.get('/organization/:id', fetchOrganization)
}

function fetchOrganization(schema: Schema<ModelsSchema>, request: Request) {
  return schema.find('organization', request.params.id)
}

type ModelsSchema = {
  organization: Organization
}
