import { User, Team } from 'mockApi/models'

export const getUsersWithoutDuplicates = (teams: Team[]) => {
  let users: User[] = []
  teams?.forEach((team) => users.push(...team.users))
  users = users.filter((user, i, arr) => arr.findIndex((usr) => usr.id === user.id) === i)
  return users
}
