import { Request, Response, Server } from 'miragejs'
import Schema from 'miragejs/orm/schema'
import { calculatePTO } from 'utils/dates'
import { initPayloadService } from '../utils/payloadService'
import { DayOffRequest, Schema as ModelsSchema } from '../models'
import { requireAuth } from '../utils/requireAuth'

export function dayOffRoutes(context: Server<ModelsSchema>) {
  context.get('/requests/:userId', fetchUserRequests)
  context.get('/available-pto', fetchAvailablePto)
  context.post('/request', createDayOffRequest)
}
function fetchUserRequests(schema: Schema<ModelsSchema>, req: Request) {
  // @ts-ignore
  return schema.where('dayOffRequest', (a) => a.userId === req.params.userId)
}

function fetchAvailablePto(schema: Schema<ModelsSchema>, req: Request) {
  let user
  try {
    user = requireAuth(schema, req)
  } catch (error) {
    return new Response(401)
  }
  return new Response(200, {}, { availablePto: user.availablePto })
}

function createDayOffRequest(schema: Schema<ModelsSchema>, req: Request) {
  const fields: readonly (keyof CreateDayOffRequestBody)[] = [
    'description',
    'endDate',
    'isSickTime',
    'message',
    'startDate',
  ]
  let user
  try {
    user = requireAuth(schema, req)
  } catch (error) {
    return new Response(401)
  }

  const body = JSON.parse(req.requestBody)

  const payload = initPayloadService()
  const { httpError } = payload
  payload.validate(fields, body)
  if (httpError) return new Response(httpError.status, {}, { errors: String(httpError.errors) })
  const notEnoughPto =
    user.availablePto -
      calculatePTO(new Date(payload.body.startDate), new Date(payload.body.endDate)) <
    0
  if (notEnoughPto) return new Response(403, {}, { errors: String(['Not enough available PTO']) })
  return schema.create('dayOffRequest', {
    ...payload.body,
    status: 'PENDING',
    user,
  })
}

type CreateDayOffRequestBody = Omit<DayOffRequest, 'status' | 'user'>
