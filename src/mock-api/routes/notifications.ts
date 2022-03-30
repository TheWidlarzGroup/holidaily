import { Request, Response, Server } from 'miragejs'
import Schema from 'miragejs/orm/schema'
import { Schema as ModelsSchema, User } from 'mockApi/models'
import { requireAuth } from 'mockApi/utils/requireAuth'

// maybe in a real application these would come via web socket?
export function notificationRoutes(context: Server<ModelsSchema>) {
  context.get('/notifications', fetchNotifications)
}
function fetchNotifications(schema: Schema<ModelsSchema>, req: Request) {
  let user: User | undefined
  try {
    user = requireAuth(schema, req)
  } catch (error) {
    return new Response(401)
  }
  // @ts-ignore
  // console.log(schema.where('notification', (a) => a.holderId === user.id))
  return schema.where('notification', (a) => a.holderId === user.id)
}
