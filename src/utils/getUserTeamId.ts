import { Team } from 'mockApi/models/mirageTypes'

export const getUserTeamId = (personName: string, teams: Team[]) => {
  let teamId = 0
  for (let i = 0; i < teams?.length; i++) {
    for (let j = 0; j < teams[i]?.users?.length; j++) {
      if (`${teams[i]?.users[j].firstName} ${teams[i]?.users[j].lastName}` === personName) {
        return (teamId = +teams[i].id)
      }
    }
  }
  return teamId
}
