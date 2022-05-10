import React, { useMemo } from 'react'
import { Team } from 'mockApi/models'
import { useNavigation } from '@react-navigation/native'
import { DashboardNavigationType } from 'navigation/types'
import { SortableList } from 'components/dragAndDrop/SortableList'
import { useUserContext } from 'hooks/useUserContext'
import { LoadingModal } from 'components/LoadingModal'
import { TeamElement } from './TeamElement'

export const SortableTeams = () => {
  const { user } = useUserContext()
  const navigation = useNavigation<DashboardNavigationType<'Dashboard'>>()
  const teamElements = useMemo(() => {
    const navigateToTeamDetails = (team: Team) => navigation.navigate('DashboardTeam', { ...team })
    if (!user?.teams) return []
    return user.teams.map((team: Team, idx) => (
      <TeamElement
        {...team}
        key={team.name}
        navigateToTeamScreen={() => navigateToTeamDetails(team)}
      />
    ))
  }, [user?.teams, navigation])

  if (!user?.teams) return <LoadingModal show />
  return <SortableList>{teamElements}</SortableList>
}
