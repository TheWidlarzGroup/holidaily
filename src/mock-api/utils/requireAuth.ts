import { Request } from 'miragejs'
import Schema from 'miragejs/orm/schema'
import { Schema as ModelsSchema, User } from 'mock-api/models'

export function requireAuth(schema: Schema<ModelsSchema>, req: Request) {
  const { userId } = req.requestHeaders
  if (!userId) throw new Error('UNAUTHORIZED')
  // assertion, because typescript assumes that find returns an array of users, which is not true
  const user = schema.find('user', userId) as User | null
  if (!user) throw new Error('UNAUTHORIZED')
  return user
}
