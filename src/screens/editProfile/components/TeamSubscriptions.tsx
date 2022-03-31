import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import { useModalContext } from 'contexts/ModalProvider'
import { BaseOpacity, Box, Text, mkUseStyles, Theme, useTheme } from 'utils/theme'
import { TeamsType } from 'utils/mocks/teamsMocks'
import IconAdd from 'assets/icons/icon-add.svg'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { useUserDetailsContext } from '../helpers/UserDetailsContext'

export const TeamSubscriptions = () => {
  const { hideModal, showModal } = useModalContext()
  const { t } = useTranslation('userProfile')
  const styles = useStyles()
  const theme = useTheme()
  const { navigate } = useNavigation()
  const { userTeams, setUserTeams } = useUserDetailsContext()
  const [teams, setTeams] = useState<TeamsType[]>([])

  useEffect(() => {
    setTeams(userTeams)
  }, [userTeams])

  const onSubscribeTeam = () => navigate('SubscribeTeam')

  const filterUnsubscribedTeams = (teamName: string) => {
    const subscriptions = userTeams.filter((team) => team.teamName !== teamName)
    setUserTeams(subscriptions)
  }

  const showChangesSavedModal = (teamName: string) =>
    showModal(
      <ChangesSavedModal
        isVisible
        hideModal={hideModal}
        content={t('unsubscribed', { teamName })}
      />
    )
  const onUnsubscribeTeam = (teamName: string) => {
    showModal(
      <ConfirmationModal
        isVisible
        hideModal={hideModal}
        onAccept={() => {
          hideModal()
          filterUnsubscribedTeams(teamName)
          showChangesSavedModal(teamName)
        }}
        onDecline={hideModal}
        content={t('ifYouUnsubscribe', { teamName })}
      />
    )
  }

  return (
    <Box paddingHorizontal="m" position="relative">
      <Text variant="labelGrey" marginLeft="m" marginBottom={userTeams.length > 0 ? 'xm' : 'xxxl'}>
        {t('userSubscriptions')}
      </Text>
      <BaseOpacity
        style={userTeams.length > 0 ? { right: 24 } : { left: 30 }}
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
          <RectButton onPress={() => onUnsubscribeTeam(teamName)} key={id} style={styles.team}>
            <Text variant="resendWhite" paddingHorizontal="l" paddingVertical="xm">
              {teamName}
            </Text>
          </RectButton>
        ))}
      </Box>
    </Box>
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
