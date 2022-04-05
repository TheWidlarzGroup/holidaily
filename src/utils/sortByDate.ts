import { User } from 'mockApi/models/mirageTypes'

export const sortByStartDate = (a: User, b: User) => {
  if (a.requests[0].startDate < b.requests[0].startDate) return -1
  if (a.requests[0].startDate > b.requests[0].startDate) return 1
  return 0
}
export const sortByEndDate = (a: User, b: User) => {
  if (a.requests[0].endDate < b.requests[0].endDate) return -1
  if (a.requests[0].endDate > b.requests[0].endDate) return 1
  return 0
}
