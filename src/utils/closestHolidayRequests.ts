import { Team, User } from 'mockApi/models/mirageTypes'

export const getClosestHolidayRequests = (teams: Team[]) => {
  let allSortedUsers: User[] = []

  teams.forEach((team) => allSortedUsers.push(...team.users))
  allSortedUsers = allSortedUsers.filter(
    (user, index, arr) => arr.findIndex((usr) => usr.id === user.id) === index
  )
  allSortedUsers = allSortedUsers.filter((user) => user.requests.length > 0)

  const sortByDate = (a: User, b: User) => {
    if (a.requests[0].startDate < b.requests[0].startDate) return -1
    if (a.requests[0].startDate > b.requests[0].startDate) return 1
    return 0
  }
  return allSortedUsers.sort(sortByDate)
}
