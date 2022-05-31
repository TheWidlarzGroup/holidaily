// @ts-nocheck
import { Request, Response, Server } from 'miragejs'
import Schema from 'miragejs/orm/schema'
import { faker } from '@faker-js/faker'
import { requireAuth } from 'mockApi/utils/requireAuth'
import { theme } from 'utils/theme'
import { calculatePTO } from 'utils/dates'
import { isOnholiday } from 'mockApi/utils/general'
import { initPayloadService } from '../utils/payloadService'
import { genManyRequests } from '../factories/requestFactory'
import { DayOffRequest, Schema as ModelsSchema, User } from '../models'

const DAY_IN_MS = 24 * 3600 * 1000

export function userRoutes(context: Server<ModelsSchema>) {
  context.get('/users', fetchAllUsers)
  context.get('/users/:id', fetchUserDataById)
  context.post('/users', createTempUser)
  context.put('/users', editUser)
}

function fetchAllUsers(schema: Schema<ModelsSchema>) {
  return schema.all('user')
}

function fetchUserDataById(schema: Schema<ModelsSchema>, req: Request) {
  return schema.find('user', req.params.id)
}

function editUser(schema: Schema<ModelsSchema>, req: Request) {
  let user: User | undefined
  try {
    user = requireAuth(schema, req)
  } catch (error) {
    return new Response(401)
  }

  const optionalFields: readonly (keyof User)[] = [
    'firstName',
    'email',
    'language',
    'lastName',
    'occupation',
    'teams',
    'photo',
    'userColor',
  ]

  const userRecord = schema.find('user', user.id)
  if (!userRecord) return new Response(400)
  const { httpError, ...payload } = initPayloadService()
  if (httpError) return new Response(httpError.status, {}, { errors: httpError.errors })
  payload.fill(optionalFields, JSON.parse(req.requestBody))
  userRecord.update(payload.body)
  return userRecord
}

function createTempUser(schema: Schema<ModelsSchema>, req: Request) {
  const mandatoryFields: readonly (keyof User)[] = ['firstName']
  const optionalFields: readonly (keyof User)[] = [
    'email',
    'language',
    'lastName',
    'occupation',
    'teams',
    'photo',
    'userColor',
  ]
  const defaultValues: Partial<User> = {
    confirmed: true,
    email: '',
    lastName: '',
    occupation: '',
    language: 'en',
    photo: null,
    role: 'Admin',
    teams: [],
    userColor: theme.colors.primary,
  }
  const body = JSON.parse(req.requestBody)
  const { httpError, ...payload } = initPayloadService()

  payload.validate(mandatoryFields, body)
  payload.fill(optionalFields, body)

  if (httpError) return new Response(httpError.status, {}, { errors: String(httpError.errors) })
  const user = schema.create('user', { ...defaultValues, ...payload.body })
  if (!user.id) return new Response(400)
  const requests = genManyRequests(5)
  requests.forEach((req) => schema.create('request', { ...req, user }))
  const userRequests = schema.where('request', { userId: user.id }).models
  const availablePto = countAvailablePto(schema, userRequests)
  const isOnHoliday = isOnholiday(userRequests)

  user.update({ availablePto, requests: userRequests, isOnHoliday })

  const June = schema.find('user', 'source-june')
  const Peter = schema.find('user', 'source-peter')
  const Tom = schema.find('user', 'source-tom')
  const Holidaily = schema.find('user', 'source-holidaily')

  userRequests.forEach((singleRequest) => {
    if (
      (singleRequest.status === 'accepted' || singleRequest.status === 'cancelled') &&
      singleRequest.description
    ) {
      schema.create('notification', {
        id: `holidaily-${singleRequest.status}`,
        createdAt: faker.date.recent(0),
        source: Holidaily,
        wasSeenByHolder: false,
        holderId: user.id,
        requestId: singleRequest.id,
        description: singleRequest.description,
        type: singleRequest.status,
      })
    }
  })

  schema.create('notification', {
    id: 'june-like',
    createdAt: faker.date.recent(0),
    source: June,
    wasSeenByHolder: false,
    holderId: user.id,
    type: 'like',
  })
  schema.create('notification', {
    id: 'peter-comment',
    createdAt: faker.date.recent(0),
    source: Peter,
    wasSeenByHolder: false,
    holderId: user.id,
    type: 'comment',
  })
  schema.create('notification', {
    id: 'holidaily-prompt',
    createdAt: faker.date.recent(0),
    source: Holidaily,
    wasSeenByHolder: false,
    holderId: user.id,
    type: 'prompt',
  })
  schema.create('notification', {
    id: 'peter-dayoff',
    createdAt: faker.date.between(
      new Date(Date.now() - 3 * DAY_IN_MS),
      new Date(Date.now() - DAY_IN_MS)
    ),
    source: Peter,
    wasSeenByHolder: false,
    holderId: user.id,
    type: 'dayOff',
    endDate: faker.date.between(
      new Date(Date.now() + 3 * DAY_IN_MS),
      new Date(Date.now() + 14 * DAY_IN_MS)
    ),
  })
  schema.create('notification', {
    id: 'tom-dayoff',
    createdAt: faker.date.between(
      new Date(Date.now() - 3 * DAY_IN_MS),
      new Date(Date.now() - DAY_IN_MS)
    ),
    source: Tom,
    wasSeenByHolder: false,
    holderId: user.id,
    type: 'dayOff',
    endDate: faker.date.between(
      new Date(Date.now() + 3 * DAY_IN_MS),
      new Date(Date.now() + 14 * DAY_IN_MS)
    ),
  })
  return user
}

const countAvailablePto = (
  schema: Schema<ModelsSchema>,
  userRequests: ReturnType<typeof schema.where>
) => {
  let availablePto = schema.findBy('organization', { name: 'Supercompany' })?.maxPtoDays ?? 24
  if (userRequests) {
    const ptoRequests = userRequests.filter(
      (req: DayOffRequest) => req.status !== 'cancelled' && !req.isSickTime
    )
    ptoRequests.forEach((req: DayOffRequest) => {
      if (req.status !== 'cancelled' && !req.isSickTime)
        availablePto -= calculatePTO(req.startDate, req.endDate)
    })
    if (availablePto < 7) availablePto = 7
  }
  return availablePto
}
