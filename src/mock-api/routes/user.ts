import { Request, Response, Server } from 'miragejs'
import Schema from 'miragejs/orm/schema'
import { initPayloadService } from '../utils/payloadService'
import { genRandomDayOffRequest } from '../factories/requestFactory'
import { Schema as ModelsSchema, User } from '../models'

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
  }
  const body = JSON.parse(req.requestBody)
  const { httpError, ...payload } = initPayloadService()
  payload.validate(mandatoryFields, body)
  payload.fill(optionalFields, body)

  if (httpError) return new Response(httpError.status, {}, { errors: String(httpError.errors) })
  const response = schema.create('user', { ...defaultValues, ...payload.body })
  if (!response.id) return response
  for (let i = 0; i < 10; i++) {
    schema.create('request', {
      ...genRandomDayOffRequest(),
      user: schema.find('user', response.id),
    })
  }
  let availablePto = schema.findBy('organization', { name: 'Supercompany' })?.maxPtoDays ?? 24
  // @ts-ignore
  const userRequests = schema.where('request', { userId: response.id }).models
  if (userRequests)
    // @ts-ignore
    availablePto = userRequests.filter((req) => req.status !== 'cancelled').length
  if (availablePto < 0) availablePto = 0
  // @ts-ignore
  response.update({ availablePto, requests: userRequests })
  return response
}
