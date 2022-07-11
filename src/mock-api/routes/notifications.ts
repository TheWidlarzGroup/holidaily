import { Request, Response, Server } from 'miragejs'
import Schema from 'miragejs/orm/schema'
import { Schema as ModelsSchema, User } from 'mockApi/models'
import { requireAuth } from 'mockApi/utils/requireAuth'

// maybe in a real application these would come via web socket?
export function notificationRoutes(context: Server<ModelsSchema>) {
  context.get('/notifications', fetchNotifications)
  context.patch('/notifications/seen/:id', markNotificationAsSeen)
  context.patch('/notifications/unseen/:id', markNotificationAsUnseen)
}
function fetchNotifications(schema: Schema<ModelsSchema>, req: Request) {
  let user: User | undefined
  try {
    user = requireAuth(schema, req)
  } catch (error) {
    return new Response(401)
  }
  // @ts-ignore
  return schema.where('notification', (a) => a.holderId === user.id)
}

function markNotificationAsSeen(schema: Schema<ModelsSchema>, req: Request) {
  let user: User | undefined
  try {
    user = requireAuth(schema, req)
  } catch (error) {
    return new Response(401)
  }
  const notification = schema.find('notification', req.params.id)
  // @ts-ignore
  if (notification.holderId !== user.id) return new Response(403)
  if (!notification) return new Response(404)
  // @ts-ignore
  notification.update({ wasSeenByHolder: true })
  return notification
}

function markNotificationAsUnseen(schema: Schema<ModelsSchema>, req: Request) {
  let user: User | undefined
  try {
    user = requireAuth(schema, req)
  } catch (error) {
    return new Response(401)
  }
  const notification = schema.find('notification', req.params.id)
  // @ts-ignore
  if (notification.holderId !== user.id) return new Response(403)
  if (!notification) return new Response(404)
  // @ts-ignore
  notification.update({ wasSeenByHolder: false })
  return notification
}
