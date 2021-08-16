import { StatusTypes } from 'screens/stats/components/Status'

export type RequestTypes = {
  description: string
  id: string
  message: string
  range: string[]
  sickTime: boolean
  status: StatusTypes
}
export type RequestsQueryTypes = {
  requests: RequestTypes[]
}
