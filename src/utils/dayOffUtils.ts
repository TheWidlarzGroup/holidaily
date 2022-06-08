import { eachDayOfInterval } from 'date-fns'
import { DayOffRequest } from 'mockApi/models'
import { isDateBetween } from './dates'

export const drawnDayoffInAlreadyScheduledTime = (
  req: Pick<DayOffRequest, 'startDate' | 'endDate'>,
  requests: Omit<DayOffRequest, 'id'>[]
) => {
  console.log(req.startDate, req.endDate)
  const start = new Date(req.startDate)
  start.setHours(0)
  start.setMinutes(0)
  start.setSeconds(0)
  start.setMilliseconds(0)
  const end = new Date(req.endDate)
  end.setHours(23)
  end.setMinutes(59)
  end.setSeconds(59)
  end.setMilliseconds(999)
  console.log(eachDayOfInterval({ start, end }))
  return requests.some((existingReq) => {
    const days = eachDayOfInterval({ start, end })
    return days.some((day) => isDateBetween(day, existingReq.startDate, existingReq.endDate))
  })
}
