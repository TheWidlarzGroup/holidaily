import { HttpError } from 'mock-api/models'

export type PayloadService = ReturnType<typeof initPayloadService>

export const initPayloadService = () => {
  let httpError: HttpError | undefined
  const body: Record<string, string> = {}
  const validate = (fields: readonly string[], requestBody: Record<string, string>) => {
    fields.forEach((field) => {
      if (!body[field]) {
        if (!httpError) httpError = { status: 400, errors: [] }
        httpError.errors.push(`Field ${field} is mandatory`)
      } else {
        body[field] = requestBody[field]
      }
    })
  }
  const fill = (fields: readonly string[], requestBody: Record<string, string>) => {
    fields.forEach((field) => {
      if (requestBody[field] !== undefined) body[field] = requestBody[field]
    })
  }
  return { validate, fill, httpError, body }
}
