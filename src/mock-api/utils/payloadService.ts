import { HttpError } from 'mock-api/models'

type PayloadService = {
  validate: F2<readonly string[], Record<string, string>>
  fill: F2<readonly string[], Record<string, string>>
  httpError: HttpError | null
  body: Record<string, string>
}

export const initPayloadService = (): PayloadService => ({
  httpError: null,
  body: {},
  validate(fields: readonly string[], requestBody: Record<string, string>) {
    fields.forEach((field) => {
      if (!requestBody[field]) {
        if (!this.httpError) this.httpError = { status: 400, errors: [] }
        this.httpError.errors.push(`Field ${field} is mandatory`)
      } else {
        this.body[field] = requestBody[field]
      }
    })
  },
  fill(fields: readonly string[], requestBody: Record<string, string>) {
    fields.forEach((field) => {
      if (requestBody[field] !== undefined) this.body[field] = requestBody[field]
    })
  },
})
