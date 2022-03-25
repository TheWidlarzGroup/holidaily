import { Request, Response, Server } from 'miragejs'
import Schema from 'miragejs/orm/schema'
import { DayOffRequest, Schema as ModelsSchema } from '../models'

export function dayOffRoutes(context: Server<ModelsSchema>) {
  context.get('/requests/:userId', fetchUserRequests)
  context.post('/request', createDayOffRequest)
}
function fetchUserRequests(schema: Schema<ModelsSchema>, req: Request) {
  // @ts-ignore
  return schema.where('dayOffRequest', (a) => a.userId === req.params.userId)
}

function createDayOffRequest(schema: Schema<ModelsSchema>, req: Request) {
  const fields: readonly (keyof CreateDayOffRequestBody)[] = [
    'description',
    'endDate',
    'isSickTime',
    'message',
    'startDate',
  ]
  const { userId } = req.requestHeaders
  if (!userId) return new Response(401)
  const user = schema.find('user', userId)
  if (!user) return new Response(401)
  const body = JSON.parse(req.requestBody)
  const payload: Partial<CreateDayOffRequestBody> = {}

  const errors: string[] = []
  fields.forEach((field) => {
    if (!body[field]) {
      errors.push(`Field ${field} is mandatory`)
    } else {
      payload[field] = body[field]
    }
  })
  if (errors.length) return new Response(400, { errors: String(errors) })
  return schema.create('dayOffRequest', {
    ...payload,
    status: 'PENDING',
    user,
  })
}

type CreateDayOffRequestBody = Omit<DayOffRequest, 'status' | 'user'>
