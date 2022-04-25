import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import { useModalContext } from 'contexts/ModalProvider'
import { BaseOpacity, Box, Text, mkUseStyles, Theme, useTheme } from 'utils/theme'
import { TeamsType, useTeamMocks } from 'utils/mocks/teamsMocks'
import IconAdd from 'assets/icons/icon-add.svg'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { useWithConfirmation } from 'hooks/useWithConfirmation'
import { useUserContext } from 'hooks/useUserContext'
import { LoadingModal } from 'components/LoadingModal'
import { useBooleanState } from 'hooks/useBooleanState'

type TeamProps = {
  teamName: string
  filterUnsubscribedTeams: F1<string>
}

export const TeamSubscriptions = () => {
  const { t } = useTranslation('userProfile')
  const theme = useTheme()
  const { navigate } = useNavigation()
  const [isProcessingData, { setTrue: showLoader, setFalse: hideLoader }] = useBooleanState(false)
  const { user, updateUser } = useUserContext()
  const { isLoading } = useTeamMocks()
  const [teams, setTeams] = useState<TeamsType[]>([])
  useEffect(() => {
    if (user?.teams) {
      showLoader()
      setTeams(user.teams.map((t) => ({ teamName: t.name, id: t.id })))
      hideLoader()
    }
  }, [user?.teams, hideLoader, showLoader])

  const onSubscribeTeam = () => navigate('SubscribeTeam')

  const filterUnsubscribedTeams = (teamName: string) => {
    const subscriptions = (user?.teams ?? []).filter((team) => team.name !== teamName)
    updateUser({ teams: subscriptions })
  }
  if (isLoading || !user || isProcessingData)
    return <LoadingModal style={{ position: 'absolute', top: 0 }} show />
  return (
    <Box paddingHorizontal="m" position="relative">
      <Text variant="labelGrey" marginLeft="m" marginBottom={user.teams.length > 0 ? 'xm' : 'xxxl'}>
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
          <Team teamName={teamName} key={id} filterUnsubscribedTeams={filterUnsubscribedTeams} />
        ))}
      </Box>
    </Box>
  )
}

const Team = (p: TeamProps) => {
  const { t } = useTranslation('userProfile')
  const { hideModal, showModal } = useModalContext()
  const showChangesSavedModal = (teamName: string) =>
    showModal(
      <ChangesSavedModal
        isVisible
        hideModal={hideModal}
        content={t('unsubscribed', { teamName })}
      />
    )
  const onUnsubscribeTeam = useWithConfirmation({
    onAccept: () => {
      p.filterUnsubscribedTeams(p.teamName)
      showChangesSavedModal(p.teamName)
    },
    content: t('ifYouUnsubscribe', { teamName: p.teamName }),
  })

  const styles = useStyles()
  return (
    <RectButton onPress={onUnsubscribeTeam} style={styles.team}>
      <Text variant="resendWhite" paddingHorizontal="l" paddingVertical="xm">
        {p.teamName}
      </Text>
    </RectButton>
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
