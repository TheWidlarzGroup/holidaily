import { useTeamsContext } from 'hooks/context-hooks/useTeamsContext'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { User } from 'mockApi/models/mirageTypes'
import { sortByEndDate, sortByStartDate } from './sortByDate'

export const useSortAllHolidayRequests = () => {
  const { user } = useUserContext()
  const { demoUserTeamMates } = useTeamsContext()
  let allSortedUsers: User[] = demoUserTeamMates

  // Comment: Demo user from TeamsContext didn't have teams assigned, so whole user is added from UserContext
  allSortedUsers = allSortedUsers.filter(
    (teamsUser) => teamsUser.firstName !== user?.firstName && teamsUser.lastName !== user?.lastName
  )
  if (user) allSortedUsers.push(user)

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

  return { sortedRequests: sortUsers(allSortedUsers) }
}
