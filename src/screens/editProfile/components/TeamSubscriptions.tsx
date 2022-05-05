import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { Box, Text } from 'utils/theme'
import { TeamsType, useTeamMocks } from 'utils/mocks/teamsMocks'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { useUserContext } from 'hooks/useUserContext'
import { LoadingModal } from 'components/LoadingModal'
import { Team } from 'mockApi/models'
import { useBooleanState } from 'hooks/useBooleanState'
import { UserProfileType } from 'navigation/types'
import { AddSubscriptionsButton } from './TeamSubscriptions/AddSubsriptionsButton'
import { ActiveSubscriptions } from './TeamSubscriptions/ActiveSubscriptions'

export const TeamSubscriptions = () => {
  const { t } = useTranslation('userProfile')
  const { navigate } = useNavigation<UserProfileType<'EditProfile'>>()
  const { user, updateUser } = useUserContext()
  const { isLoading } = useTeamMocks()
  const [teams, setTeams] = useState<TeamsType[]>(
    user?.teams.map((t) => ({ teamName: t.name, id: t.id })) ?? []
  )
  const [changesSaved, { setTrue: showModal, setFalse: hideModal }] = useBooleanState(false)
  const [modalContent, setModalContent] = useState('')
  const addTeams = (newTeams: TeamsType[]) => setTeams([...teams, ...newTeams])
  const onSubscribeTeam = () =>
    navigate('SubscribeTeam', {
      userTeams: teams,
      addSubscriptions: (teams) => {
        addTeams(teams)
        setModalContent(teams.length > 1 ? t('newTeamsConfirmation') : t('newTeamConfirmation'))
        showModal()
      },
    })

  useEffect(() => {
    let timeout: number
    if (changesSaved) timeout = setTimeout(hideModal, 1200)
    return () => clearTimeout(timeout)
  }, [changesSaved, hideModal])

  const filterUnsubscribedTeams = (teamName: string) => {
    if (!user) return
    setModalContent(t('unsubscribed', { teamName }))
    showModal()
    const userNextTeams: Team[] = []
    const teamsParsedForDisplay: TeamsType[] = []
    user.teams.forEach((team) => {
      if (team.name === teamName) return
      userNextTeams.push({ ...team, users: [...team.users, user] })
      teamsParsedForDisplay.push({ teamName: team.name, id: team.id })
    })
    updateUser({ teams: userNextTeams })
    setTeams(teamsParsedForDisplay)
  }
  if (isLoading || !user) return <LoadingModal style={{ position: 'absolute', top: 0 }} show />
  return (
    <>
      <Box paddingHorizontal="m" position="relative">
        <Text
          variant="labelGrey"
          marginLeft="m"
          marginBottom={user.teams.length > 0 ? 'xm' : 'xxxl'}>
          {t('userSubscriptions')}
        </Text>
        <AddSubscriptionsButton onSubscribeTeam={onSubscribeTeam} userTeams={user.teams} />
        <ActiveSubscriptions teams={teams} filterUnsubscribedTeams={filterUnsubscribedTeams} />
      </Box>
      <ChangesSavedModal isVisible={changesSaved} content={modalContent} />
    </>
  )
}
