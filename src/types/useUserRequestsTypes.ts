export type RequestTypes = {
  description: string
  id: string
  message: string
  range: string[]
  sickTime: boolean
  status: 'NOW' | 'APPROVED' | 'PENDING' | 'PAST'
}
export type RequestsQueryTypes = {
  requests: RequestTypes[]
}
