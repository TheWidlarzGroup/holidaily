import React from 'react'
import { Team, User } from 'mockApi/models'
import { useNavigation } from '@react-navigation/native'
import { DashboardNavigationType } from 'navigation/types'
import { SortableList } from 'components/dragAndDrop/SortableList'
import { useUserContext } from 'hooks/useUserContext'
import { LoadingModal } from 'components/LoadingModal'
import { TeamElement } from './TeamElement'

type SortableTeamsProps = {
  openUserModal: F1<User>
}
export const SortableTeams = (p: SortableTeamsProps) => {
  const { user } = useUserContext()
  const navigation = useNavigation<DashboardNavigationType<'Dashboard'>>()
  const navigateToTeamDetails = (team: Team) =>
    navigation.navigate('DashboardTeam', { ...team, openUserModal: p.openUserModal })
  if (!user?.teams) return <LoadingModal show />
  return (
    <SortableList openUserModal={p.openUserModal}>
      {user.teams.map((team: Team) => (
        <TeamElement
          {...team}
          key={team.name}
          navigateToTeamScreen={() => navigateToTeamDetails(team)}
        />
      ))}
    </SortableList>
  )
}
