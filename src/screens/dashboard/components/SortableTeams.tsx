import React from 'react'
import { Team } from 'mockApi/models'
import { useNavigation } from '@react-navigation/native'
import { DashboardNavigationType } from 'navigation/types'
import { SortableList } from 'components/dragAndDrop/SortableList'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { LoadingModal } from 'components/LoadingModal'
import { TeamElement } from './TeamElement'

export const SortableTeams = () => {
  const { user } = useUserContext()
  const navigation = useNavigation<DashboardNavigationType<'DASHBOARD'>>()
  const navigateToTeamDetails = (team: Team) => navigation.navigate('DASHBOARD_TEAM', { ...team })
  const teamElements = (user?.teams ?? []).map((team: Team) => (
    <TeamElement
      {...team}
      key={team.name}
      navigateToTeamScreen={() => navigateToTeamDetails(team)}
    />
  ))

  if (!user?.teams) return <LoadingModal show />
  return <SortableList>{teamElements}</SortableList>
}
