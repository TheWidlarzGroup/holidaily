import { DayOffRequest } from 'mock-api/models'

export type RequestTypes = {
  description: string
  id: string
  message: string
  range: string[]
  sickTime: boolean
  status: DayOffRequest['status']
}
export type RequestsQueryTypes = {
  requests: RequestTypes[]
}
