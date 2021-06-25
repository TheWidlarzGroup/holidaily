import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import { BaseOpacity, Box, Text, mkUseStyles, Theme } from 'utils/theme'
import { TeamsType } from 'utils/mocks/teamsMocks'
import IconAdd from 'assets/icons/icon-add.svg'
import { useUserDetailsContext } from '../helpers/UserDetailsContext'

export const TeamSubscriptions = () => {
  const { t } = useTranslation('userProfile')
  const styles = useStyles()
  const { navigate } = useNavigation()
  const { userTeams } = useUserDetailsContext()
  const [teams, setTeams] = useState<TeamsType[]>([])
  useEffect(() => {
    setTeams(userTeams)
  }, [userTeams])

  const onAddSubscribedTeam = () => navigate('SubscribeTeam')

  const onUnsubscribeTeam = () => {
    // TODO display modal to confirm changes
    console.log('unsubscribe')
  }

  return (
    <Box paddingHorizontal="m" marginBottom={userTeams.length > 0 ? 's' : 'xl'} position="relative">
      <Text variant="label1" marginLeft="m" marginBottom="xm">
        {t('userSubscriptions')}
      </Text>
      <BaseOpacity
        onPress={onAddSubscribedTeam}
        justifyContent="center"
        alignItems="center"
        position="absolute"
        right={24}
        top={32}
        height={44}
        width={44}
        borderRadius="full"
        backgroundColor="lightGrey">
        <IconAdd />
      </BaseOpacity>
      <Box flexDirection="row" marginRight="xl" flexWrap="wrap">
        {teams.map(({ teamName, id }) => (
          <RectButton onPress={onUnsubscribeTeam} key={id} style={styles.team}>
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
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
