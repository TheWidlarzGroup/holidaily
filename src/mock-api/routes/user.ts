import { Request, Response, Server } from 'miragejs'
import Schema from 'miragejs/orm/schema'
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
    'organization',
    'photo',
    'userColor',
  ]
  const defaultValues = {
    confirmed: true,
    email: '',
    lastName: '',
    occupation: '',
    color: '#FF8B3F',
    language: 'en',
    photo: null,
    role: 'Admin',
  }
  const body = JSON.parse(req.requestBody)
  const payload: Partial<User> = {}

  const errors: string[] = []
  mandatoryFields.forEach((field) => {
    if (!body[field]) {
      errors.push(`Field ${field} is mandatory`)
    } else {
      payload[field] = body[field]
    }
  })
  optionalFields.forEach((field) => {
    if (body[field] !== undefined) payload[field] = body[field]
  })
  if (errors.length) return new Response(400, { errors: String(errors) })
  const response = schema.create('user', { ...defaultValues, ...payload })
  for (let i = 0; i < 10; i++) {
    schema.create('dayOffRequest', {
      ...genRandomDayOffRequest(),
      user: schema.find('user', response.id),
    })
  }
  return response
}
