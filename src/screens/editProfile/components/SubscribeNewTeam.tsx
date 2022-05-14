import React, { useMemo, useState } from 'react'
import { UserProfileNavigationProps } from 'navigation/types'
import { ParsedTeamType } from 'utils/mocks/teamsMocks'
import { useUserContext } from 'hooks/useUserContext'
import { LoadingModal } from 'components/LoadingModal'
import { SwipableScreen } from 'navigation/SwipeableScreen'
import { SearchTeams } from './TeamSubscriptions/SearchTeams'
import { SaveSubscriptions } from './TeamSubscriptions/SaveSubscriptions'

type SubscribeNewTeamProps = UserProfileNavigationProps<'SubscribeTeam'>

export const SubscribeNewTeam = ({ route: { params: p } }: SubscribeNewTeamProps) => {
  const [selectedTeams, setSelectedTeams] = useState<ParsedTeamType[]>([])
  const { user } = useUserContext()
  const teams = useMemo(() => {
    if (!user?.teams) return []
    return user.teams.map((t) => ({ teamName: t.name, id: t.id }))
  }, [user?.teams])
  if (!user) return <LoadingModal show />

  return (
    <SwipableScreen>
      <SearchTeams
        setSelectedTeams={setSelectedTeams}
        selectedTeams={selectedTeams}
        userTeams={teams}
      />
      <SaveSubscriptions
        setSubscriptions={p.addSubscriptions}
        selectedTeams={selectedTeams}
        disabled={!selectedTeams.length}
      />
    </SwipableScreen>
  )
}
