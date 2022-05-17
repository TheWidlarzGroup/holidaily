import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { BaseOpacity, Box, Text, useTheme } from 'utils/theme'
import { TeamsType, useTeamMocks } from 'utils/mocks/teamsMocks'
import { useUserContext } from 'hooks/useUserContext'
import { LoadingModal } from 'components/LoadingModal'
import { Team } from 'mockApi/models'
import { UserProfileType } from 'navigation/types'
import IconAdd from 'assets/icons/icon-add.svg'
import { AddSubscriptionsButton } from './TeamSubscriptions/AddSubsriptionsButton'
import { ActiveSubscriptions } from './TeamSubscriptions/ActiveSubscriptions'

export const TeamSubscriptions = ({ showSuccessToast }: { showSuccessToast: F0 }) => {
  const { t } = useTranslation('userProfile')
  const { navigate } = useNavigation<UserProfileType<'EditProfile'>>()
  const { user, updateUser } = useUserContext()
  const { isLoading } = useTeamMocks()
  const [teams, setTeams] = useState<TeamsType[]>(
    user?.teams.map((t) => ({ teamName: t.name, id: t.id })) ?? []
  )
  const addTeams = (newTeams: TeamsType[]) => setTeams([...teams, ...newTeams])
  const onSubscribeTeam = () =>
    navigate('SubscribeTeam', {
      userTeams: teams,
      addSubscriptions: (teams) => {
        addTeams(teams)
        showSuccessToast()
      },
    })

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
        <SubscriptionsEmptyState onPress={onSubscribeTeam} />
      )}
    </Box>
  )
}
type SubscriptionsEmptyStateProps = {
  onPress: F0
}
const SubscriptionsEmptyState = (p: SubscriptionsEmptyStateProps) => {
  const { t } = useTranslation('userProfile')
  const theme = useTheme()
  return (
    <BaseOpacity
      activeOpacity={0.8}
      onPress={p.onPress}
      bg="specialBrighterOpaque"
      borderRadius="l2min"
      padding="m"
      flex={1}
      flexDirection="row"
      alignItems="center">
      <Text variant="textBoldSM" style={{ flex: 1 }}>
        {t('teamsEmptyState')}
      </Text>
      <Box
        bg="special"
        marginLeft="m"
        aspectRatio={1}
        alignItems="center"
        justifyContent="center"
        borderRadius="full">
        <IconAdd color={theme.colors.alwaysWhite} />
      </Box>
    </BaseOpacity>
  )
}
