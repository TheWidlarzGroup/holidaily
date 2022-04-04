import { Team, User } from 'mockApi/models/mirageTypes'
import { sortByEndDate, sortByStartDate } from './sortByDate'

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

  const sortUsers = (users: User[]) => {
    const usersWithHoliday = users.filter((user) => user.isOnHoliday)
    const usersWithoutHoliday = users.filter((user) => !user.isOnHoliday)
    usersWithHoliday.sort(sortByEndDate)
    usersWithoutHoliday.sort(sortByStartDate)
    return usersWithHoliday.concat(usersWithoutHoliday)
  }
  return sortUsers(allSortedUsers)
}
