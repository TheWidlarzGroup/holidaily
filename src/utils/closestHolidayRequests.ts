import { Team, User } from 'mockApi/models/mirageTypes'

export const getClosestHolidayRequests = (teams: Team[]) => {
  let allSortedUsers: User[] = []

  teams.forEach((team) => allSortedUsers.push(...team.users))
  allSortedUsers = allSortedUsers.filter(
    (user, index, arr) => arr.findIndex((usr) => usr.id === user.id) === index
  )
  allSortedUsers = allSortedUsers.filter((user) => user.requests.length > 0)
  allSortedUsers = allSortedUsers.filter(
    (user) => user.requests[0].endDate > new Date().toISOString()
  )

  const sortByStartDate = (a: User, b: User) => {
    if (a.requests[0].startDate < b.requests[0].startDate) return -1
    if (a.requests[0].startDate > b.requests[0].startDate) return 1
    return 0
  }
  const sortByEndDate = (a: User, b: User) => {
    if (a.requests[0].endDate < b.requests[0].endDate) return -1
    if (a.requests[0].endDate > b.requests[0].endDate) return 1
    return 0
  }

  const sortUsers = (users: User[]) => {
    const usersWithHoliday = users.filter((user) => user.isOnHoliday)
    const usersWithoutHoliday = users.filter((user) => !user.isOnHoliday)
    usersWithHoliday.sort(sortByEndDate)
    usersWithoutHoliday.sort(sortByStartDate)
    return usersWithHoliday.concat(usersWithoutHoliday)
  }
  return sortUsers(allSortedUsers)
}
