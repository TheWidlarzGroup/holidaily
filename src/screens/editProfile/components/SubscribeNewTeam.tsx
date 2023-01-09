import React, { useEffect, useState } from 'react'
import { ParsedTeamType, TeamsType } from 'utils/mocks/teamsMocks'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { LoadingModal } from 'components/LoadingModal'
import { SwipeableScreen } from 'navigation/SwipeableScreen'
import { SearchTeams } from './TeamSubscriptions/SearchTeams'
import { SaveSubscriptions } from './TeamSubscriptions/SaveSubscriptions'

export const SubscribeNewTeam = () => {
  const [selectedTeams, setSelectedTeams] = useState<ParsedTeamType[]>([])
  const { user } = useUserContext()
  const [teams, setTeams] = useState<TeamsType[]>([])

  useEffect(() => {
    setTeams(user?.teams.map((t) => ({ teamName: t.name, id: t.id })) ?? [])
  }, [user?.teams])

  if (!user) return <LoadingModal show />

  return (
    <SwipeableScreen swipeWithIndicator>
      <SearchTeams
        setSelectedTeams={setSelectedTeams}
        selectedTeams={selectedTeams}
        userTeams={teams}
      />
      <SaveSubscriptions selectedTeams={selectedTeams} disabled={!selectedTeams.length} />
    </SwipeableScreen>
  )
}
