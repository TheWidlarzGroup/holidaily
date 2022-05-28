import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { Box, Text } from 'utils/theme'
import { TeamsType, useTeamMocks } from 'utils/mocks/teamsMocks'
import { useUserContext } from 'hooks/useUserContext'
import { LoadingModal } from 'components/LoadingModal'
import { Team } from 'mockApi/models'
import { AppNavigationType } from 'navigation/types'
import { JoinFirstTeam } from 'screens/dashboard/components/JoinFirstTeam'
import { notify } from 'react-native-notificated'
import { Analytics } from 'services/analytics'
import { AddSubscriptionsButton } from './TeamSubscriptions/AddSubsriptionsButton'
import { ActiveSubscriptions } from './TeamSubscriptions/ActiveSubscriptions'

export const TeamSubscriptions = () => {
  const { t } = useTranslation('userProfile')
  const { navigate } = useNavigation<AppNavigationType<'SUBSCRIBE_NEW_TEAM'>>()
  const { isLoading } = useTeamMocks()
  const { user, updateUser } = useUserContext()
  const [teams, setTeams] = useState<TeamsType[]>([])

  useEffect(() => {
    setTeams(user?.teams.map((t) => ({ teamName: t.name, id: t.id })) ?? [])
  }, [user?.teams])

  const onSubscribeTeam = () => {
    const teamNames = teams.map((team) => team.teamName)
    if (teamNames.length > 0)
      Analytics().track('TEAM_SUBSCRIBED', { teamName: JSON.stringify(teamNames) })
    navigate('SUBSCRIBE_NEW_TEAM')
  }

  const removeSubscription = (teamName: string) => {
    if (!user) return
    notify('success', { params: { title: t('changesSaved') } })
    const userNextTeams: Team[] = []
    const teamsParsedForDisplay: TeamsType[] = []
    user.teams.forEach((team) => {
      if (team.name === teamName) return
      userNextTeams.push(team)
      teamsParsedForDisplay.push({ teamName: team.name, id: team.id })
    })
    updateUser({ teams: userNextTeams })
    setTeams(teamsParsedForDisplay)
    Analytics().track('TEAM_UNSUBSCRIBED', { teamName })
  }

  if (isLoading || !user) return <LoadingModal style={{ position: 'absolute', top: 0 }} show />
  return (
    <Box>
      <Text variant="sectionLabel" marginLeft="m" marginBottom="xm">
        {t('userTeams')}
      </Text>

      {teams.length ? (
        <Box flexDirection="row">
          <ActiveSubscriptions teams={teams} removeSubscription={removeSubscription} />
          <AddSubscriptionsButton onSubscribeTeam={onSubscribeTeam} userTeams={user.teams} />
        </Box>
      ) : (
        <JoinFirstTeam />
      )}
    </Box>
  )
}
