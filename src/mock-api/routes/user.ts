import { Request, Response, Server } from 'miragejs'
import Schema from 'miragejs/orm/schema'
import { initPayloadService } from '../utils/payloadService'
import { genRandomDayOffRequest } from '../factories/requestFactory'
import { Schema as ModelsSchema, User } from '../models'
import { faker } from '@faker-js/faker'

export function userRoutes(context: Server<ModelsSchema>) {
  context.get('/users', fetchAllUsers)
  context.get('/users/:id', fetchUserDataById)
  context.post('/users', createTempUser)
}

function fetchAllUsers(schema: Schema<ModelsSchema>) {
  return schema.all('user')
}

function fetchUserDataById(schema: Schema<ModelsSchema>, req: Request) {
  return schema.find('user', req.params.id)
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
    availablePto: 24,
  }
  const body = JSON.parse(req.requestBody)
  const { httpError, ...payload } = initPayloadService()
  payload.validate(mandatoryFields, body)
  payload.fill(optionalFields, body)
  if (httpError) return new Response(httpError.status, {}, { errors: String(httpError.errors) })
  const response = schema.create('user', { ...defaultValues, ...payload.body })
  const user = schema.find('user', response.id)
  if (!user) return new Response(400)
  for (let i = 0; i < 10; i++) {
    if (!response.id) break
    schema.create('request', {
      ...genRandomDayOffRequest(),
      user,
    })
  }
  const June = schema.find('user', 'source-june')
  const Peter = schema.find('user', 'source-peter')
  const Tom = schema.find('user', 'source-tom')
  schema.create('notification', {
    createdAt: faker.date.recent(0),
    // "source: June" causes mirage to respond with 500 error
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
  return response
}

const DAY_IN_MS = 24 * 3600 * 1000
