import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { BaseOpacity, Box, Text, mkUseStyles, Theme } from 'utils/theme'
import IconAdd from 'assets/icons/icon-add.svg'

export const TeamSubscriptions = () => {
  const { t } = useTranslation('userProfile')
  const styles = useStyles()
  const { navigate } = useNavigation()
  const [userTeams, setUserTeams] = useState<string[]>(['Smartsoft', 'Akademia'])

  const onAddSubscribedTeam = () => navigate('SubscribeTeam')

  const onRemoveSubscribedTeam = (team: string) => {
    // TODO display modal to confirm changes
    setUserTeams(userTeams.filter((item: string) => item !== team))
  }

  return (
    <Box paddingHorizontal="m" marginBottom="l">
      <Text variant="label1" marginLeft="m" marginBottom="xm">
        {t('userSubscriptions')}
      </Text>
      <Box flexDirection="row" position="relative">
        <BaseOpacity
          onPress={onAddSubscribedTeam}
          justifyContent="center"
          alignItems="center"
          position="absolute"
          right={0}
          top={0}
          height={44}
          width={44}
          borderRadius="full"
          backgroundColor="lightGrey">
          <IconAdd />
        </BaseOpacity>
        {userTeams.map((team, idx) => (
          <BaseOpacity onPress={() => onRemoveSubscribedTeam(team)} key={idx} style={styles.team}>
            <Text variant="resendWhite" paddingHorizontal="l" paddingVertical="xm">
              {team}
            </Text>
          </BaseOpacity>
        ))}
      </Box>
    </Box>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  team: {
    marginRight: theme.spacing.s,
    backgroundColor: theme.colors.black,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
