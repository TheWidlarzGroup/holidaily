import { eachDayOfInterval } from 'date-fns'
import { DayOffRequest } from 'mockApi/models'
import { isDateBetween } from './dates'

export const drawnDayoffInAlreadyScheduledTime = (
  req: Pick<DayOffRequest, 'startDate' | 'endDate'>,
  requests: Omit<DayOffRequest, 'id'>[]
) => {
  const start = new Date(req.startDate)
  const end = new Date(req.endDate)
  return requests.some((existingReq) => {
    const days = eachDayOfInterval({ start, end })
    return days.some((day) => isDateBetween(day, existingReq.startDate, existingReq.endDate))
  })
}
