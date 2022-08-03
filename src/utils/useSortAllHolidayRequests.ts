import { useTeamsContext } from 'hooks/context-hooks/useTeamsContext'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { User } from 'mockApi/models/mirageTypes'
import { sortByEndDate, sortByStartDate } from './sortByDate'

export const useSortAllHolidayRequests = () => {
  const { user } = useUserContext()
  const { allUsers } = useTeamsContext()
  let allSortedUsers: User[] = allUsers

  // Comment: Demo user from TeamsContext didn't have teams assigned, so whole user is added from UserContext
  allSortedUsers = allSortedUsers.filter((teamsUser) => teamsUser.id !== user?.id)
  if (user) allSortedUsers.push(user)

  allSortedUsers = allSortedUsers.map((user) => ({
    ...user,
    requests: user.requests.filter((req) => req.status !== 'past'),
  }))
  allSortedUsers = allSortedUsers.filter((user) => user.requests.length > 0)

  const sortUsers = (users: User[]) => {
    const usersWithHoliday = users.filter((user) => user.isOnHoliday)
    const usersWithoutHoliday = users.filter((user) => !user.isOnHoliday)
    usersWithHoliday.sort(sortByEndDate)
    usersWithoutHoliday.sort(sortByStartDate)
    return usersWithHoliday.concat(usersWithoutHoliday)
  }

  return { sortedRequests: sortUsers(allSortedUsers) }
}
