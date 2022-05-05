import React from 'react'
import { Team, User } from 'mockApi/models'
import { useNavigation } from '@react-navigation/native'
import { DashboardNavigationType } from 'navigation/types'
import { SortableList } from 'components/dragAndDrop/SortableList'
import { TeamElement } from './TeamElement'

type SortableTeamsProps = {
  openUserModal: F1<User>
  teams: Team[]
}

export const SortableTeams = (p: SortableTeamsProps) => {
  const navigation = useNavigation<DashboardNavigationType<'Dashboard'>>()
  const navigateToTeamDetails = (team: Team) =>
    navigation.navigate('DashboardTeam', { ...team, openUserModal: p.openUserModal })
  return (
    <SortableList openUserModal={p.openUserModal}>
      {p.teams.map((team: Team) => (
        <TeamElement
          {...team}
          key={team.name}
          navigateToTeamScreen={() => navigateToTeamDetails(team)}
        />
      ))}
    </SortableList>
  )
}
