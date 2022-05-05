import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import { BaseOpacity, Box, Text, mkUseStyles, Theme, useTheme } from 'utils/theme'
import { TeamsType, useTeamMocks } from 'utils/mocks/teamsMocks'
import IconAdd from 'assets/icons/icon-add.svg'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { useUserContext } from 'hooks/useUserContext'
import { LoadingModal } from 'components/LoadingModal'
import { Team } from 'mockApi/models'
import { useBooleanState } from 'hooks/useBooleanState'
import { ConfirmationModal } from 'components/ConfirmationModal'

type TeamProps = {
  teamName: string
  filterUnsubscribedTeams: F1<string>
}

export const TeamSubscriptions = () => {
  const { t } = useTranslation('userProfile')
  const theme = useTheme()
  const { navigate } = useNavigation()
  const { user, updateUser } = useUserContext()
  const { isLoading } = useTeamMocks()
  const [teams, setTeams] = useState<TeamsType[]>(
    user?.teams.map((t) => ({ teamName: t.name, id: t.id })) ?? []
  )
  const [changesSaved, { setTrue: showModal, setFalse: hideModal }] = useBooleanState(false)
  const [lastUnsubscribedTeam, setLastUnsubscribedTeam] = useState('')
  const addTeams = (newTeams: TeamsType[]) => setTeams([...teams, ...newTeams])
  const onSubscribeTeam = () => navigate('SubscribeTeam', { addSubscriptions: addTeams })

  useEffect(() => {
    let timeout: number
    if (changesSaved) timeout = setTimeout(hideModal, 1200)
    return () => clearTimeout(timeout)
  }, [changesSaved, hideModal])

  const filterUnsubscribedTeams = (teamName: string) => {
    if (!user) return
    setLastUnsubscribedTeam(teamName)
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
        <BaseOpacity
          style={user.teams.length > 0 ? { right: 24 } : { left: 30 }}
          onPress={onSubscribeTeam}
          justifyContent="center"
          alignItems="center"
          position="absolute"
          top={32}
          height={44}
          width={44}
          borderRadius="full"
          backgroundColor="lightGrey">
          <IconAdd color={theme.colors.headerGrey} />
        </BaseOpacity>
        <Box flexDirection="row" marginRight="xl" flexWrap="wrap">
          {teams.map(({ teamName, id }) => (
            <TeamElement
              teamName={teamName}
              key={id}
              filterUnsubscribedTeams={filterUnsubscribedTeams}
            />
          ))}
        </Box>
      </Box>
      <ChangesSavedModal
        isVisible={changesSaved}
        content={t('unsubscribed', { teamName: lastUnsubscribedTeam })}
      />
    </>
  )
}

const TeamElement = (p: TeamProps) => {
  const [isConfirmationNeeded, { setTrue: askForConfirmation, setFalse: dismissConfirmation }] =
    useBooleanState(false)

  const styles = useStyles()
  return (
    <>
      <RectButton onPress={askForConfirmation} style={styles.team}>
        <Text variant="resendWhite" paddingHorizontal="l" paddingVertical="xm">
          {p.teamName}
        </Text>
      </RectButton>
      <ConfirmationModal
        isVisible={isConfirmationNeeded}
        onAccept={() => {
          dismissConfirmation()
          p.filterUnsubscribedTeams(p.teamName)
        }}
        hideModal={dismissConfirmation}
        onDecline={dismissConfirmation}
      />
    </>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  team: {
    marginRight: theme.spacing.s,
    marginBottom: theme.spacing.m,
    backgroundColor: theme.colors.black,
    borderRadius: theme.spacing.l,
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
