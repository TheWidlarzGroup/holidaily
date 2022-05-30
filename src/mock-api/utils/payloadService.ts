import { HttpError } from 'mock-api/models'

type PayloadService<RT extends Record<string, unknown>> = {
  validate: F2<readonly string[], RT>
  fill: F2<readonly string[], RT>
  httpError: HttpError | null
  body: Partial<RT>
}

export const initPayloadService = <RT extends Record<string, unknown>>(): PayloadService<RT> => ({
  httpError: null,
  body: {},
  validate(fields: readonly (keyof RT)[], requestBody: RT) {
    fields.forEach((field) => {
      if (!requestBody[field]) {
        if (!this.httpError) this.httpError = { status: 400, errors: [] }
        this.httpError.errors.push(`Field ${String(field)} is mandatory`)
      } else {
        this.body[field] = requestBody[field]
      }
    })
  },
  fill(fields: readonly (keyof RT)[], requestBody: RT) {
    fields.forEach((field) => {
      if (requestBody[field] !== undefined) this.body[field] = requestBody[field]
    })
  },
})
