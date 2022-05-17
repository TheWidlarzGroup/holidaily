import { DayOffRequest } from 'mockApi/models'

export const sortAndFilterRequests = (requests: DayOffRequest[]) => {
  let sortedRequests = requests.sort((a, b) => {
    if (a.startDate < b.startDate) return -1
    if (a.startDate > b.startDate) return 1
    return 0
  })
  sortedRequests = sortedRequests.filter((req) => req.status !== 'past')
  return sortedRequests
}
