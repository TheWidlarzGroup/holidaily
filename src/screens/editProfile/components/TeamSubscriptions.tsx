import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { Box, Text } from 'utils/theme'
import { TeamsType, useTeamMocks } from 'utils/mocks/teamsMocks'
import { useUserContext } from 'hooks/useUserContext'
import { LoadingModal } from 'components/LoadingModal'
import { Team } from 'mockApi/models'
import { JoinFirstTeam } from 'screens/dashboard/components/JoinFirstTeam'
import { UserProfileType } from 'navigation/types'
import { AddSubscriptionsButton } from './TeamSubscriptions/AddSubsriptionsButton'
import { ActiveSubscriptions } from './TeamSubscriptions/ActiveSubscriptions'

type TeamSubscriptionsType = {
  showSuccessToast: F0
  openSubscribeModal?: true
}

export const TeamSubscriptions = ({
  showSuccessToast,
  openSubscribeModal,
}: TeamSubscriptionsType) => {
  const { t } = useTranslation('userProfile')
  const { navigate } = useNavigation<UserProfileType<'EditProfile'>>()
  const { isLoading } = useTeamMocks()
  const { user, updateUser } = useUserContext()
  const [teams, setTeams] = useState<TeamsType[]>(
    user?.teams.map((t) => ({ teamName: t.name, id: t.id })) ?? []
  )

  const onSubscribeTeam = useCallback(() => {
    const addTeams = (newTeams: TeamsType[]) => setTeams([...teams, ...newTeams])
    navigate('SubscribeTeam', {
      userTeams: teams,
      addSubscriptions: (teams) => {
        addTeams(teams)
        showSuccessToast()
      },
    })
  }, [navigate, showSuccessToast, teams])

  useEffect(() => {
    if (openSubscribeModal) onSubscribeTeam()
  }, [onSubscribeTeam, openSubscribeModal])

  const removeSubscription = (teamName: string) => {
    if (!user) return
    showSuccessToast()
    const userNextTeams: Team[] = []
    const teamsParsedForDisplay: TeamsType[] = []
    user.teams.forEach((team) => {
      if (team.name === teamName) return
      userNextTeams.push(team)
      teamsParsedForDisplay.push({ teamName: team.name, id: team.id })
    })
    updateUser({ teams: userNextTeams })
    setTeams(teamsParsedForDisplay)
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
