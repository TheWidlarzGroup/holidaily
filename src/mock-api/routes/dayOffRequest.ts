import { Request, Response, Server } from 'miragejs'
import Schema from 'miragejs/orm/schema'
import { calculatePTO } from 'utils/dates'
import { isOnholiday } from 'mockApi/utils/general'
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
  return schema.where('request', (a) => a.userId === req.params.userId)
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
  let user
  try {
    user = requireAuth(schema, req)
  } catch (error) {
    return new Response(401)
  }
  const mandatoryFields: readonly (keyof CreateDayOffRequestBody)[] = [
    'description',
    'endDate',
    'isSickTime',
    'message',
    'startDate',
  ]
  const optionalFields: readonly (keyof CreateDayOffRequestBody)[] = ['attachments']
  const body = JSON.parse(req.requestBody)

  const payload = initPayloadService<DayOffRequest>()
  const { httpError } = payload
  payload.validate(mandatoryFields, body)
  if (httpError) return new Response(httpError.status, {}, { errors: String(httpError.errors) })

  payload.fill(optionalFields, body)
  if (!payload.body.startDate || !payload.body.endDate)
    return new Response(500, {}, { error: 'Something went wrong' })
  const userPtoAfterRequest = payload.body.isSickTime
    ? user.availablePto
    : user.availablePto -
      calculatePTO(new Date(payload.body.startDate), new Date(payload.body.endDate))
  const ptoIsUnavailable = !payload.body.isSickTime && userPtoAfterRequest < 0
  if (ptoIsUnavailable)
    return new Response(403, {}, { errors: String(['Not enough available PTO']) })
  // @ts-ignore
  user.update({ availablePto: userPtoAfterRequest })
  const request = schema.create('request', {
    ...payload.body,
    status: payload.body.isSickTime ? 'accepted' : 'pending',
    user,
  })
  const isDayoffHappeningNow =
    payload.body.isSickTime && isOnholiday([payload.body as DayOffRequest])
  return new Response(
    201,
    {},
    {
      request,
      availablePto: userPtoAfterRequest,
      isOnHoliday: user.isOnHoliday || isDayoffHappeningNow,
    }
  )
}

type CreateDayOffRequestBody = Omit<DayOffRequest, 'status' | 'user'>
