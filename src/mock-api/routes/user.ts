import { Request, Response, Server } from 'miragejs'
import Schema from 'miragejs/orm/schema'
import { faker } from '@faker-js/faker'
import { requireAuth } from 'mockApi/utils/requireAuth'
import { initPayloadService } from '../utils/payloadService'
import { genRandomDayOffRequest } from '../factories/requestFactory'
import { Schema as ModelsSchema, User } from '../models'

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
  // @ts-ignore
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
  }
  const body = JSON.parse(req.requestBody)
  const { httpError, ...payload } = initPayloadService()
  payload.validate(mandatoryFields, body)
  payload.fill(optionalFields, body)
  if (httpError) return new Response(httpError.status, {}, { errors: String(httpError.errors) })
  const user = schema.create('user', { ...defaultValues, ...payload.body })
  if (!user.id) return new Response(400)
  for (let i = 0; i < 10; i++) {
    schema.create('request', {
      ...genRandomDayOffRequest(),
      user,
    })
  }
  let availablePto = schema.findBy('organization', { name: 'Supercompany' })?.maxPtoDays ?? 24
  // @ts-ignore
  const userRequests = schema.where('request', { userId: user.id }).models
  if (userRequests)
    // @ts-ignore
    availablePto = userRequests.filter((req) => req.status !== 'cancelled').length
  if (availablePto < 0) availablePto = 0
  // @ts-ignore
  user.update({ availablePto, requests: userRequests })

  const June = schema.find('user', 'source-june')
  const Peter = schema.find('user', 'source-peter')
  const Tom = schema.find('user', 'source-tom')
  schema.create('notification', {
    createdAt: faker.date.recent(0),
    source: June,
    wasSeenByHolder: false,
    holderId: user.id,
    type: 'like',
  })
  schema.create('notification', {
    createdAt: faker.date.recent(0),
    source: Peter,
    wasSeenByHolder: false,
    holderId: user.id,
    type: 'comment',
  })
  schema.create('notification', {
    createdAt: faker.date.between(
      new Date(Date.now() - 3 * DAY_IN_MS),
      new Date(Date.now() - 7 * DAY_IN_MS)
    ),
    source: Peter,
    wasSeenByHolder: true,
    holderId: user.id,
    type: 'dayOff',
    endDate: faker.date.between(
      new Date(Date.now() + 3 * DAY_IN_MS),
      new Date(Date.now() + 14 * DAY_IN_MS)
    ),
  })
  schema.create('notification', {
    createdAt: faker.date.between(
      new Date(Date.now() - 3 * DAY_IN_MS),
      new Date(Date.now() - 7 * DAY_IN_MS)
    ),
    source: Tom,
    wasSeenByHolder: true,
    holderId: user.id,
    type: 'dayOff',
    endDate: faker.date.between(
      new Date(Date.now() + 3 * DAY_IN_MS),
      new Date(Date.now() + 14 * DAY_IN_MS)
    ),
  })
  return user
}

const DAY_IN_MS = 24 * 3600 * 1000
