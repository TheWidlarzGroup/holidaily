// @ts-nocheck
import { Request, Response, Server } from 'miragejs'
import Schema from 'miragejs/orm/schema'
import { DayOffRequest, Schema as ModelsSchema, User } from 'mockApi/models'
import { requireAuth } from 'mockApi/utils/requireAuth'

export function statsRoutes(context: Server<ModelsSchema>) {
  context.get('/stats', fetchStats)
}

const fetchStats = (schema: Schema<ModelsSchema>, req: Request) => {
  let user: User
  try {
    user = requireAuth(schema, req)
  } catch (error) {
    return new Response(401)
  }
  const requests = schema.where('request', (a) => a.userId === user.id)
  const ptoTaken = requests.filter((req: DayOffRequest) => {
    const wasAccepted = req.status === 'accepted' || req.status === 'past'
    const isNotSicktime = !req.isSickTime
    return wasAccepted && isNotSicktime
  }).length
  const sickdaysTaken = requests.filter(
    (req: DayOffRequest) => req.isSickTime && req.status === 'past'
  ).length
  return new Response(200, {}, { ptoTaken: String(ptoTaken), sickdaysTaken: String(sickdaysTaken) })
}
