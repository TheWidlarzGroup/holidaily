// @ts-nocheck
import { Request, Response, Server } from 'miragejs'
import Schema from 'miragejs/orm/schema'
import { DayOffRequest, Schema as ModelsSchema, User } from 'mockApi/models'
import { requireAuth } from 'mockApi/utils/requireAuth'
import { calculatePTO } from 'utils/dates'

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

  const PTOrequests = requests.filter((req: DayOffRequest) => {
    const wasAccepted = req.status === 'accepted' || req.status === 'past'
    const isNotSicktime = !req.isSickTime
    return wasAccepted && isNotSicktime
  }).models

  let ptoTaken = 0
  PTOrequests.forEach((req: DayOffRequest) => {
    ptoTaken += calculatePTO(req.startDate, req.endDate)
  })

  let sickdaysTaken = 0
  const sickDays = requests.filter((req: DayOffRequest) => req.isSickTime).models
  sickDays.forEach((req: DayOffRequest) => {
    sickdaysTaken += calculatePTO(req.startDate, req.endDate)
  })

  return new Response(200, {}, { ptoTaken: String(ptoTaken), sickdaysTaken: String(sickdaysTaken) })
}
