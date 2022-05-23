import { isAfter, isBefore } from 'date-fns'
import { DayOffRequest } from 'mockApi/models'

export const isOnholiday = (userRequests: DayOffRequest[]) =>
  userRequests.some((req) => {
    const isTodayAfterStart = isAfter(Date.now(), new Date(req.startDate))
    const isTodayBeforeEnd = isBefore(Date.now(), new Date(req.endDate))
    return isTodayAfterStart && isTodayBeforeEnd
  })
