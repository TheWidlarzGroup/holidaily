export type RequestStatus = 'CANCELLED' | 'APPROVED' | 'PENDING' | 'PAST'

export type RequestTypes = {
  description: string
  id: string
  message: string
  range: string[]
  sickTime: boolean
  status: RequestStatus
}
export type RequestsQueryTypes = {
  requests: RequestTypes[]
}
