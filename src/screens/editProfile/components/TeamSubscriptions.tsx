import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme'
import { TeamsType, useTeamMocks } from 'utils/mocks/teamsMocks'
import { useUserContext } from 'hooks/useUserContext'
import { LoadingModal } from 'components/LoadingModal'
import { Team } from 'mockApi/models'
import { JoinFirstTeam } from 'screens/dashboard/components/JoinFirstTeam'
import { SwipeableModalRegular } from 'components/SwipeableModalRegular'
import { useBooleanState } from 'hooks/useBooleanState'
import { AddSubscriptionsButton } from './TeamSubscriptions/AddSubsriptionsButton'
import { ActiveSubscriptions } from './TeamSubscriptions/ActiveSubscriptions'
import { SubscribeNewTeam } from './SubscribeNewTeam'

type TeamSubscriptionsType = {
  showSuccessToast: F0
}

export const TeamSubscriptions = ({ showSuccessToast }: TeamSubscriptionsType) => {
  const [isSubscribeModalVisible, { setFalse: closeSubscribeModal, setTrue: openSubscribeModal }] =
    useBooleanState(false)
  const { t } = useTranslation('userProfile')
  const { isLoading } = useTeamMocks()
  const { user, updateUser } = useUserContext()
  const [teams, setTeams] = useState<TeamsType[]>([])

  useEffect(() => {
    setTeams(user?.teams.map((t) => ({ teamName: t.name, id: t.id })) ?? [])
  }, [user?.teams])

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
    <>
      <Box>
        <Text variant="sectionLabel" marginLeft="m" marginBottom="xm">
          {t('userTeams')}
        </Text>

        {teams.length ? (
          <Box flexDirection="row">
            <ActiveSubscriptions teams={teams} removeSubscription={removeSubscription} />
            <AddSubscriptionsButton openModal={openSubscribeModal} userTeams={user.teams} />
          </Box>
        ) : (
          <JoinFirstTeam openModal={openSubscribeModal} />
        )}
      </Box>
      <SwipeableModalRegular
        hasIndicator
        isOpen={isSubscribeModalVisible}
        onHide={closeSubscribeModal}>
        <SubscribeNewTeam closeModal={closeSubscribeModal} />
      </SwipeableModalRegular>
    </>
  )
}
