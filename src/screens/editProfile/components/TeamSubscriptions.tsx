import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import { BaseOpacity, Box, Text, mkUseStyles, Theme } from 'utils/theme'
import { TeamsType } from 'utils/mocks/teamsMocks'
import IconAdd from 'assets/icons/icon-add.svg'

export const TeamSubscriptions = () => {
  const { t } = useTranslation('userProfile')
  const styles = useStyles()
  const { navigate } = useNavigation()
  const [userTeams, setUserTeams] = useState<TeamsType[]>([])

  const onAddSubscribedTeam = () => navigate('SubscribeTeam', { userTeams, setUserTeams })

  const onUnsubscribeTeam = () => {
    // TODO display modal to confirm changes
    console.log('unsubscribe')
  }

  return (
    <Box paddingHorizontal="m" marginBottom="s" position="relative">
      <Text variant="label1" marginLeft="m" marginBottom="xm">
        {t('userSubscriptions')}
      </Text>
      <BaseOpacity
        onPress={onAddSubscribedTeam}
        justifyContent="center"
        alignItems="center"
        position="absolute"
        right={24}
        top={22}
        height={44}
        width={44}
        borderRadius="full"
        backgroundColor="lightGrey">
        <IconAdd />
      </BaseOpacity>
      <Box flexDirection="row" marginRight="xl" flexWrap="wrap">
        {userTeams.map(({ teamName, id }) => (
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
